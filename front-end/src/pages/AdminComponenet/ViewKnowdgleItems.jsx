import React, { useEffect, useState } from "react";
import {
  Box,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
} from "@mui/material";
import API from "../../Context/Axiox";

function ViewKnowdgleItems({ showDelete = true }) {
  const [knowdgeData, setKnowdgleData] = useState([]);

  useEffect(() => {
    fetchContentdata();
  }, []);

  const fetchContentdata = async () => {
    try {
      const respond = await API.get(`getItems`);
      setKnowdgleData(respond.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handelDelete = (knowdgleItemId) => {
    try {
      API.delete(`deleteItems?knowledgeItemID=${knowdgleItemId}`);
      alert("Deleted Successfully");
      window.location.reload();
    } catch (error) {
      if (error.response) {
        console.error("Error response:", error.response);
        alert(`${error.response.data.message}`);
      } else {
        console.error("Error:", error.message);
        alert("An unexpected error occurred.");
      }
    }
  };

  const deleteConformation = (knowdgleItemId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this post?"
    );
    if (confirmDelete) {
      handelDelete(knowdgleItemId);
    }
  };

  return (
    <Box sx={{ mb: 5 }}>
      <TableContainer className="glass-card" sx={{ overflow: "hidden" }}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 600 }}>Title</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Description</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Link</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Type</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Added By</TableCell>
              {showDelete && <TableCell sx={{ fontWeight: 600 }} align="center">Action</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {knowdgeData.length === 0 ? (
              <TableRow>
                <TableCell colSpan={showDelete ? 6 : 5} align="center" sx={{ py: 4, color: "text.secondary" }}>
                  No knowledge items created yet.
                </TableCell>
              </TableRow>
            ) : (
              knowdgeData.map((content) => (
                <TableRow 
                  key={content.knowdgleItemId}
                  sx={{ "&:hover": { backgroundColor: "rgba(99, 102, 241, 0.04)" }, transition: "background-color 0.2s" }}
                >
                  <TableCell sx={{ fontWeight: 600, color: "text.primary" }}>{content.knowdgleItemTitle}</TableCell>
                  <TableCell sx={{ color: "text.secondary", maxWidth: 250, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {content.knowdgleItemDescription}
                  </TableCell>
                  <TableCell sx={{ color: "primary.main" }}>
                    {content.knowdgleitemLink ? (
                      <a href={content.knowdgleitemLink} target="_blank" rel="noopener noreferrer" style={{ color: "inherit", textDecoration: "none" }}>
                        View Link 🔗
                      </a>
                    ) : (
                      "-"
                    )}
                  </TableCell>
                  <TableCell sx={{ color: "text.secondary", textTransform: "uppercase", fontWeight: 500 }}>
                    {content.knowdgleItemtype}
                  </TableCell>
                  <TableCell sx={{ color: "text.secondary" }}>{content.addedEmail}</TableCell>
                  {showDelete && (
                    <TableCell align="center">
                      <Button
                        variant="outlined"
                        color="secondary"
                        onClick={() => deleteConformation(content.knowdgleItemId)}
                        sx={{ borderRadius: "8px", textTransform: "none", py: 0.5 }}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  )}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default ViewKnowdgleItems;
