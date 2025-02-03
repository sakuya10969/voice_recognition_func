import axios from "axios";
import useSWR from "swr";

const apiUrl = "http://127.0.0.1:8000";
// const apiUrl = "http://localhost:8000";
// const apiUrl = "https://ca-vr-dev-011--t94gl0v.gentlebeach-99fe5a4e.eastasia.azurecontainerapps.io/";

export const handleSendAudio = async (project, projectDirectory, file) => {
    try {
        let formData = new FormData();
        formData.append("project", project.name);
        formData.append("project_directory", projectDirectory);
        formData.append("file", file);
        // **1. タスクIDを取得（処理開始）**
        const response = await axios.post(`${apiUrl}/transcribe`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });
        const taskId = response.data.task_id;  // タスクIDを取得
        console.log("処理開始:", response.data.message);
        // **2. タスクの完了をポーリングでチェック**
        return new Promise((resolve, reject) => {
            const interval = setInterval(async () => {
                try {
                    const statusResponse = await axios.get(`${apiUrl}/transcribe/${taskId}`);
                    const status = statusResponse.data.status;

                    if (status === "completed") {
                        console.log("処理完了:", statusResponse.data.result);
                        clearInterval(interval); // **完了したらポーリング停止**
                        resolve(statusResponse.data.result);
                    } else if (status === "failed") {
                        console.error("処理失敗:", statusResponse.data.result);
                        clearInterval(interval); // **エラーの場合も停止**
                        reject(new Error(statusResponse.data.result));
                    } else if (status === "not found") {
                        console.error("タスクIDが見つかりません");
                        clearInterval(interval);
                        reject(new Error("タスクIDが見つかりません"));
                    } else {
                        console.log("現在のステータス:", status);
                    }
                } catch (error) {
                    console.error("ステータス取得エラー:", error);
                }
            }, 10000);
        });
    } catch (error) {
        throw new Error(error);
    }
};


const fetcher = (url) => axios.get(url).then((res) => res.data);
export const useFetchSites = () => {
    const { data, error, isLoading } = useSWR(`${apiUrl}/sites`, fetcher);
    return { sitesData: data?.value || [], sitesError: error, isSitesLoading: isLoading };
}

export const useFetchDirectories = (site) => {
    const { data, error, isloading } = useSWR(`${apiUrl}/directories/${site.id}`, fetcher);
    return { directoriesData: data?.value || [], directoriesError: error, IsDirectoriesLoading: isloading };
}
