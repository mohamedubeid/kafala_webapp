import { useTranslation } from "next-i18next";
import { Button } from "@mui/material";

type ActionsProps = {
  stepId: string;
  stepNumber: number;
  lastStep: number;
};
const Actions = ({ stepId, stepNumber, lastStep }: ActionsProps) => {
    const { t: translate } = useTranslation();
  
  return (
    <div className="mt-4 flex flex-wrap justify-end gap-3">
      <Button type="submit" form={stepId} variant="contained"
        sx={{
          minWidth: "200px",
          height: "45px",
          border: "1px solid #0b7275",
          borderRadius: "8px",
          transition: "color 0.5s ease-in-out, background-color 0.5s ease-in-out",
          outline: "none",
          boxShadow: "none",
          backgroundColor: "#0b7275",
          color: "#fff",
          "&:hover": {
            color: "#0b7275",
            backgroundColor: "#fff",
          },
        }}
    >
        {stepNumber != lastStep ? translate('children:saveAndContinue') : translate('children:saveAndFinish')}
      </Button>
    </div>
  );
};
export default Actions;
