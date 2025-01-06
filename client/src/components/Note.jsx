import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { Document, Packer, Paragraph } from "docx";
import { saveAs } from "file-saver";
import IconButton from "@mui/material/IconButton";
import DownloadIcon from "@mui/icons-material/Download";

const Note = ({ content }) => {
  const handleDownload = async () => {
    const fileName = `議事録_${new Date().toLocaleString().replace(/[/:\,]/g, "-")}.docx`;

    const doc = new Document({
      sections: [
        {
          properties: {},
          children: [new Paragraph(content)],
        },
      ],
    });

    const blob = await Packer.toBlob(doc);
    saveAs(blob, fileName);
  };

  return (
    <Paper
      elevation={3}
      sx={{
        width: "700px",
        height: "600px",
        padding: 2,
        margin: 2,
        boxShadow: "0 3px 5px rgba(0, 0, 0)",
        border: "1px solid black",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderBottom: "1px solid black",
          pb: 1,
        }}
      >
        <Typography
          variant="h6"
          sx={{ fontWeight: "bold", textAlign: "center" }}
        >
          議事録
        </Typography>
        <IconButton
          sx={{
            transform: "transLateX(50px)",
            ":disabled": {
              opacity: 0.5,
            } }}
          onClick={handleDownload}
          disabled={!content || content.trim() === ""}
        >
          <DownloadIcon sx={{ color: "black" }} />
        </IconButton>
      </Box>

      <Box
        sx={{
          overflowY: "auto",
          mt: 2,
          height: "90%",
        }}
      >
        <Typography variant="body1" sx={{ whiteSpace: "pre-wrap" }}>
          {content}
        </Typography>
      </Box>
    </Paper>
  );
};

export default Note;
