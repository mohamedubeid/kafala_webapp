import React, { useState } from "react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { Steps } from "./guardians-steps/steps";
import Actions from "./guardians-steps/actions";
import StepOne from "./guardians-steps/stepOne";
import StepTwo from "./guardians-steps/stepTwo";
import StepThree from "./guardians-steps/stepThree";
import StepFour from "./guardians-steps/stepFour";
import StepFive from "./guardians-steps/stepFive";
import StepSix from "./guardians-steps/stepSix";


const UpdateForm = () => {

  const { t: translate } = useTranslation();
  const router = useRouter();
  const { id } = router.query;

  const isNew = id === undefined;
  const [childEntity, setChildEntity] = useState({});

  const steps = [
    {
      number: 0,
      formName: 'profileForm',
      stepName: translate('children:steps:profile'),
      onClick: !isNew ? () => handleStepClick(0) : undefined,
    },
    {
      number: 1,
      formName: 'healthStatusForm',
      stepName: translate('children:steps:health-status'),
      onClick: !isNew ? () => handleStepClick(1) : undefined,
    },
    {
      number: 2,
      formName: 'maritalStatusForm',
      stepName: translate('children:steps:social-status'),
      onClick: !isNew ? () => handleStepClick(2) : undefined,
    },
    {
      number: 3,
      formName: 'educationalForm',
      stepName: translate('children:steps:education'),
      onClick: !isNew ? () => handleStepClick(3) : undefined,
    },
    {
      number: 4,
      formName: 'sponsorForm',
      stepName: translate('children:steps:sponsorship'),
      onClick: !isNew ? () => handleStepClick(4) : undefined,
    },
    {
      number: 5,
      formName: 'HarmsForm',
      stepName: translate('children:steps:harms'),
      onClick: !isNew ? () => handleStepClick(5) : undefined,
    },
  ];


  const [stepNumber, setStepNumder] = useState<number>(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>(isNew ? [0] : steps.map((_, index) => index));

  const handleStepClick = (stepIndex: number) => {
    if (!isNew && (completedSteps.includes(stepIndex) || stepIndex === 0)) {
      setStepNumder(stepIndex);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (isNew) {
      toast.warning(translate('children:steps:steps-locked'));
    }
  };

  const handleNext = () => {
    if (stepNumber < steps.length - 1) {
      const nextStep = stepNumber + 1;
      setStepNumder(nextStep);

      setCompletedSteps(prevCompletedSteps => {
        if (!prevCompletedSteps.includes(nextStep)) {
          return [...prevCompletedSteps, nextStep];
        }
        return prevCompletedSteps;
      });

      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };


  return (
    <section className="main-sections">
      <div className="container">
        <div className="kids-header flex flex-wrap items-start justify-between gap-3 md:text-lg">
          <div className="kids-title section-title">
            {/* {translate("common:YOUR_GUARDIANS")} */}
          </div>
        </div>
        <div className="w-full lg:w-2/3 md:w-2/3 sm:w-full mx-auto">
        <Steps
            steps={steps.map(step => ({
              ...step,
              onClick: step.onClick ? step.onClick : () => {},
            }))}
            stepNumber={stepNumber}
            completedSteps={completedSteps}
            setStepNumder={setStepNumder}
            isNew={isNew}
          />

          <div>

            {stepNumber === 0 && <StepOne handleNext={handleNext} updateChild={setChildEntity}/>}
            {stepNumber === 1 && <StepTwo handleNext={handleNext} child={childEntity}/>}
            {stepNumber === 2 && <StepThree handleNext={handleNext} child={childEntity}/>}
            {stepNumber === 3 && <StepFour handleNext={handleNext} child={childEntity}/>}
            {stepNumber === 4 && <StepFive handleNext={handleNext} child={childEntity}/>}
            {stepNumber === 5 && <StepSix handleNext={handleNext} child={childEntity}/>}
            <Actions
              lastStep={steps.length - 1}
              stepId={steps[stepNumber].formName}
              stepNumber={stepNumber}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default UpdateForm;
