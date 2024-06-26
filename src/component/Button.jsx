import * as React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

const CreateButton = ({ label, onClick }) => {
  return (
    <Stack spacing={2} direction="row">
      <Button
        variant="outlined"
        onClick={onClick}
        sx={{ height: 56, color: "black" }}
      >
        {label}
      </Button>
    </Stack>
  );
};
export default CreateButton;
