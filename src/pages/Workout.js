import React, { useState } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import {useDispatch, useSelector} from "react-redux"
import { resetExerciseTypes, setExerciseTypes } from "../redux/exerciseTypesSlice";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Workout = () => {
  const dispatch = useDispatch()
  const exerciseTypes = useSelector(state => state.exerciseTypes.exerciseTypes)
  const [isOpen, setIsOpen] = useState(false);
  const handleClose = () => setIsOpen(false);

  const clickModal = () => {
    
    axios
      .get("http://localhost:3000/exercise_types")
      .then(function (response) {
        console.log("resp from exercise endpoint", response);
        console.log("res data", response.data);
        dispatch(setExerciseTypes(response.data))
        setIsOpen(true);
        console.log("#### OF EXER", exerciseTypes.length)
      })
      .catch((error) => {
        console.error(error);
      })
  };
  return (
    <div>
      <button onClick={clickModal}>Add Exercises</button>
      <Modal
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <ul>
            {exerciseTypes.map(exercise =>(
              <li key={exercise.id}>
                {exercise.name}
              </li>
            ))}
          </ul>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {exerciseTypes.length}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};

export default Workout;
