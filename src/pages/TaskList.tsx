import {
  AlertColor,
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Header from "../components/Header/Header";
import { useAppSelector, useThunkAppDispatch } from "../store/hooks";
import { useNavigate } from "react-router-dom";
import {
  creatTaskAction,
  deleteTaskAction,
  selectAll,
  taskListAction,
  updateTaskAction
} from "../store/modules/TasksSlice";
import Modal from "../components/Modal/Modal";
import ModalDelete from "../components/ModalDelete/ModalDelete";
import BasicAlert from "../components/Alerts/BasicAlert";
import InputTask from "../components/InputTask/InputTask";
import TaskCard from "../components/TaskCard/TaskCard";
import {
  CreateTaskType,
  DeleteTaskType,
  UpdateTaskType
} from "../service/api.service";
import ModalArchived from "../components/ModalArchived/ModalArchived";

const Tasks: React.FC = () => {
  const [editingTask, setEditingTask] = useState<string>("");
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [openConfirmModal, setOpenConfirmModal] = useState<boolean>(false);
  const [openArchivedModal, setOpenArchivedModal] = useState<boolean>(false);
  const [message, setAlertMessage] = useState<string>("");
  const [color, setColor] = useState<AlertColor>();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [filled, setFiled] = useState<string>("alltasks");
  const taskList = useAppSelector(selectAll);
  const loginRedux = useAppSelector((state) => state.login);
  const navigate = useNavigate();
  const thunkDispatch = useThunkAppDispatch();

  useEffect(() => {
    console.log("lista de tasks", taskList);
    if (!loginRedux.logged) {
      alert("Faça o login!");
      navigate("/");
      return;
    }
    const archived = filled === "archived";
    thunkDispatch(taskListAction({ userId: loginRedux.user.id, archived }));
  }, [loginRedux, navigate, thunkDispatch, filled]);

  const handleAddTask = async (task: CreateTaskType) => {
    const result = await thunkDispatch(
      creatTaskAction({
        userId: task.userId,
        id: task.id,
        title: task.title,
        description: task.description,
        archived: false
      })
    ).unwrap();
    setIsOpen(true);
    setColor("success");
    setAlertMessage("Task criada com sucesso");
  };

  const handleEditOpen = (id: string) => {
    setEditingTask(id);
    setOpenModal(true);
  };

  const handleClickClose = () => {
    setOpenModal(false);
  };

  const handleArchivedOpen = (id: string) => {
    setEditingTask(id);
    setOpenArchivedModal(true);
  };

  const handleCloseArchived = () => {
    setOpenArchivedModal(false);
  };

  const handleEdit = (task: UpdateTaskType) => {
    thunkDispatch(updateTaskAction(task));
    setOpenModal(false);
    setOpenArchivedModal(false);
  };

  const handleDeleteOpen = (id: string) => {
    setEditingTask(id);
    setOpenConfirmModal(true);
  };

  const handleConfirmModal = (task: DeleteTaskType) => {
    thunkDispatch(deleteTaskAction(task));
    setOpenConfirmModal(false);
  };

  const handleConfirmClose = () => {
    setOpenConfirmModal(false);
  };

  const handleChange = (event: SelectChangeEvent) => {
    setFiled(event.target.value as string);
    if (filled === "archived") {
      thunkDispatch(
        taskListAction({ userId: loginRedux.user.id, archived: true })
      );
    } else {
      thunkDispatch(
        taskListAction({ userId: loginRedux.user.id, archived: false })
      );
    }
  };
  return (
    <>
      <Header />
      <Grid
        container
        sx={{
          backgroundColor: "background.default",
          minHeight: "82vh",
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "center"
        }}
      >
        <Grid
          item
          xs={11}
          sm={10}
          md={8}
          lg={7}
          sx={{ my: 3, backgroundColor: "action.hover", borderRadius: "7px" }}
        >
          <>
            <InputTask handleAddTask={handleAddTask} />
            <Box sx={{ mx: 5, mb: 3 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Status da Task
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={filled}
                  label="Status da Task"
                  onChange={handleChange}
                >
                  <MenuItem value={"alltasks"}>Todas as Tasks</MenuItem>
                  <MenuItem value={"archived"}>Arquivadas</MenuItem>
                </Select>
              </FormControl>
            </Box>
            {taskList
              .filter((task) => task.archived === (filled === "archived"))
              .map((item: any) => {
                return item ? (
                  <div key={item.id}>
                    <TaskCard
                      handleClickOpen={() => handleEditOpen(item.id)}
                      handleDeleteTask={() => handleDeleteOpen(item.id)}
                      handleArchiveTask={() => handleArchivedOpen(item.id)}
                      task={item}
                    />
                  </div>
                ) : null;
              })}
            <ModalArchived
              handleEdit={handleEdit}
              handleCloseEdit={handleCloseArchived}
              id={editingTask}
              isOpen={openArchivedModal}
            />
            <Modal
              id={editingTask}
              handleCloseEdit={handleClickClose}
              handleEdit={handleEdit}
              isOpen={openModal}
            />
            <ModalDelete
              id={editingTask}
              handleConfirmClose={handleConfirmClose}
              handleConfirmModal={handleConfirmModal}
              isOpen={openConfirmModal}
            />
            <BasicAlert
              message={message}
              openAlert={isOpen}
              setOpenAlert={setIsOpen}
              alertColor={color}
            />
          </>
        </Grid>
      </Grid>
    </>
  );
};

export default Tasks;
