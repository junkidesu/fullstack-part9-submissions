import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  ButtonGroup,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
} from "@mui/material";
import { EntryFormValues } from "../../types";

interface NewEntryFormProps {
  onSubmit: (newEntry: EntryFormValues) => void;
}

const NewEntryForm = ({ onSubmit }: NewEntryFormProps) => {
  const [description, setDescription] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [specialist, setSpecialist] = useState<string>("");
  const [healthCheckRating, setHealthCheckRating] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [employerName, setEmployerName] = useState<string>("");
  const [dischargeDate, setDischargeDate] = useState<string>("");
  const [dischargeCriteria, setDischargeCriteria] = useState<string>("");
  const [diagnosisCodes, setDiagnosisCodes] = useState<string>("");
  const [type, setType] = useState<string>("HealthCheck");

  const addEntry = (event: React.SyntheticEvent) => {
    event.preventDefault();

    const base = {
      description,
      date,
      specialist,
      diagnosisCodes: diagnosisCodes.split(",").map((s) => s.trim()),
    };

    switch (type) {
      case "HealthCheck":
        onSubmit({
          ...base,
          type,
          healthCheckRating: Number(healthCheckRating),
        });
        break;
      case "OccupationalHealthcare":
        onSubmit({
          ...base,
          type,
          employerName,
          sickLeave:
            startDate && endDate
              ? {
                  startDate,
                  endDate,
                }
              : undefined,
        });
        break;
      case "Hospital":
        onSubmit({
          ...base,
          type,
          discharge: {
            date: dischargeDate,
            criteria: dischargeCriteria,
          },
        });
        break;
      default:
        console.log('to be added')
    }
  };

  return (
    <Box sx={{ border: "3px dotted black", padding: "5px 10px" }}>
      <h4>New Entry</h4>

      <form onSubmit={addEntry}>
        <FormControl fullWidth>
          <InputLabel id="entry-type-select-label">Type</InputLabel>

          <Select
            labelId="entry-type-select-label"
            label="Type"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <MenuItem value={"HealthCheck"}>Health Check</MenuItem>
            <MenuItem value={"OccupationalHealthcare"}>
              Occupational Healthcare
            </MenuItem>
            <MenuItem value={"Hospital"}>Hospital</MenuItem>
          </Select>
        </FormControl>

        <TextField
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          variant="standard"
          label="Description"
          sx={{ width: "100%" }}
          required
        />

        <TextField
          id="date"
          variant="standard"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          label="Date"
          sx={{ width: "100%" }}
          required
        />

        <TextField
          id="specialist"
          variant="standard"
          value={specialist}
          onChange={(e) => setSpecialist(e.target.value)}
          label="Specialist"
          sx={{ width: "100%" }}
          required
        />

        <TextField
          id="diagnosis-codes"
          variant="standard"
          value={diagnosisCodes}
          onChange={(e) => setDiagnosisCodes(e.target.value)}
          label="Diagnose codes"
          sx={{ width: "100%" }}
          required
        />

        {type === "HealthCheck" && (
          <>
            <TextField
              id="healthcheck-rating"
              variant="standard"
              type="number"
              value={healthCheckRating}
              onChange={(e) => setHealthCheckRating(e.target.value)}
              label="Healthcheck Rating"
              sx={{ width: "100%" }}
              required
            />
          </>
        )}

        {type === "OccupationalHealthcare" && (
          <div>
            <TextField
              id="employer"
              variant="standard"
              value={employerName}
              onChange={(e) => setEmployerName(e.target.value)}
              label="Employer"
              required
              fullWidth
            />
            <Typography>Sick leave</Typography>

            <TextField
              id="start-date"
              variant="standard"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              label="Start Date"
              fullWidth
            />

            <TextField
              id="end-date"
              variant="standard"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              label="End Date"
              fullWidth
            />
          </div>
        )}

        {type === "Hospital" && (
          <div>
            <Typography>Discharge</Typography>

            <TextField
              id="discharge-date"
              variant="standard"
              label="Date"
              value={dischargeDate}
              onChange={(e) => setDischargeDate(e.target.value)}
              required
              fullWidth
            />

            <TextField
              id="discharge-criteria"
              variant="standard"
              label="Criteria"
              value={dischargeCriteria}
              onChange={(e) => setDischargeCriteria(e.target.value)}
              required
              fullWidth
            />
          </div>
        )}

        <ButtonGroup
          variant="contained"
          aria-label="medium button group"
          sx={{ marginTop: "10px" }}
        >
          <Button type="submit">Add</Button>
          <Button>Cancel</Button>
        </ButtonGroup>
      </form>
    </Box>
  );
};

export default NewEntryForm;
