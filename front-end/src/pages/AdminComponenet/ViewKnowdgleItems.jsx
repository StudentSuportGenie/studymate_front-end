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

function ViewKnowdgleItems() {
  const [knowdgeData, setKnowdgleData] = useState([]);

  useEffect(() => {
    fetchContentdata();
  }, []);

  const fetchContentdata = async () => {
    try {
      const respond = await API.get(`getItems`);
      setKnowdgleData(respond.data);
      console.log(respond.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handelDelete = (knowdgleItemId) => {
    try {
      const respond = API.delete(
        `deleteItems?knowledgeItemID=${knowdgleItemId}`
      );
      alert("Delete Successfuly");
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
    <>
      <Box>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>knowdgleItemTitle</TableCell>
                <TableCell>knowdgleItemDescription</TableCell>
                <TableCell>knowdgleitemLink</TableCell>
                <TableCell>knowdgleItemtype</TableCell>
                <TableCell>addedEmail</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {knowdgeData.map((content) => (
                <TableRow key={content.knowdgleItemId}>
                  <TableCell>{content.knowdgleItemTitle}</TableCell>
                  <TableCell>{content.knowdgleItemDescription}</TableCell>
                  <TableCell>{content.knowdgleitemLink}</TableCell>
                  <TableCell>{content.knowdgleItemtype}</TableCell>
                  <TableCell>{content.addedEmail}</TableCell>
                  <TableCell>
                    <Button
                      onClick={() => deleteConformation(content.knowdgleItemId)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
}

export default ViewKnowdgleItems;
