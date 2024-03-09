import React, { useState, useEffect } from "react";

import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

const Notes = () => {
  // 할 일 목록을 담는 상태
  const [todos, setTodos] = useState([]);
  // 입력 폼의 상태
  const [newTodo, setNewTodo] = useState("");

  const fetchData = async () => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/notes`);
    const jsonData = await response.json();
    if (jsonData.status) {
      console.error("Server error. Status code:", jsonData.status);
    } else {
      setTodos(jsonData.result.data);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(() => fetchData(), 10000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  const saveNotesInServer = async (data) => {
    await fetch(`${process.env.REACT_APP_API_URL}/notes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: data,
      }),
    });
  };

  // 새로운 할 일 추가 함수
  const addTodo = async () => {
    if (newTodo.trim() !== "") {
      setTodos([...todos, newTodo]);
      setNewTodo("");
      saveNotesInServer([...todos, newTodo]);
    }
  };

  // 할 일 삭제 함수
  const deleteTodo = async (index) => {
    const newNotes = [...todos];
    newNotes.splice(index, 1);
    saveNotesInServer(newNotes);
    setTodos(newNotes);
  };

  const handleOnKeyPress = (e) => {
    if (e.key === "Enter") {
      addTodo(); // Enter 입력이 되면 클릭 이벤트 실행
    }
  };

  return (
    <>
      <Typography variant="h5" sx={{ fontSize: "25px" }}>
        Notes
      </Typography>
      <div>
        {todos.map((todo, index) => (
          <List key={index}>
            <ListItem
              secondaryAction={
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => deleteTodo(index)}
                >
                  <DeleteIcon />
                </IconButton>
              }
            >
              <ListItemAvatar>
                <Avatar
                  sx={{ width: "25px", height: "25px", bgcolor: "#07BA65" }}
                >
                  <CheckIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={todo} sx={{ width: "auto" }} />
            </ListItem>
          </List>
        ))}

        {/* 새로운 할 일 입력 폼 */}
        <Box display="flex" justifyContent="flex-end">
          <TextField
            size="small"
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            onKeyPress={handleOnKeyPress}
          />
          <Button
            variant="contained"
            size=""
            onClick={addTodo}
            sx={{ marginLeft: "5px" }}
          >
            추가
          </Button>
        </Box>
      </div>
    </>
  );
};

export default Notes;
