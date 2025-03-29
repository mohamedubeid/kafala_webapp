import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Form, Input, Button, Select, Checkbox } from "antd";
import { useTranslation } from "next-i18next";
import { HealthStatus, LastLevelOfEducation, MentalIllnessTypes, OrphanClassification, SponserConnection, SponsershipType, SychologicalHealthTypes } from "@/types/enm";
import { IChildHealthStatus } from "@/types/child/healthStatus";
import UploadImage from "uploads/UploadImage";
import useAddUpdateChildHealthStatus from "@/hooks/guardians/addUpdateChildHealthStatus";
import { toast } from "react-toastify";
import { IChild } from "@/types/child/profile";
import { IChildMaritalStatus } from "@/types/child/childMartialStatus";
import { IChildEducationStatus } from "@/types/child/childEducationStatus";
import { IChildSponsorShip } from "@/types/child/childSponsership";


type ChildProps = {
  child?: IChild;
  handleNext: () => void;
};


const StepFive = ({ child, handleNext }: ChildProps) => {
    const [formRef] = Form.useForm();
    const { t: translate } = useTranslation();
    const { TextArea } = Input;
    const router = useRouter();
    const { id } = router.query;
    const sponserConnectionValues = Object.keys(SponserConnection);
    const sponsershipTypeValues = Object.keys(SponsershipType);

    const [childNotes, setChildNotes] = useState([{ id: null, notes: { id: null, note: '' }}]);


    const saveEntity = (values: IChildSponsorShip) => {
      const entity: IChildSponsorShip = {
        ...values,
        sponsershipDuration: 'ANNUAL',
        child: child,
        childSponsorShipNotes: childNotes.map(childNote => ({
          id: childNote.id,
          notes: {
            id: childNote.notes.id,
            note: childNote.notes.note,
          },
        })),
      };

      console.log(entity, 'eeeeeeeeeeeeeeeeeeeeee')
    };



    const handleAddChildNote = () => {
      setChildNotes([...childNotes, { id: null, notes: { id: null, note: '' }}]);
    };

  
    // Handle note change
    const handleChildNoteChange = (index: number, event: any) => {
      const newNotes = [...childNotes];
      if (!newNotes[index]) {
        newNotes[index] = { id: null, notes: { id: null, note: '' } };
      }
      newNotes[index].notes.note = event.target.value;
      setChildNotes(newNotes);
    };

    return (
      <div className="stepContainer">

        <Form
          onFinish={saveEntity}
          layout="vertical"
          className="sign-up-form auth-form flex w-full flex-col"
          form={formRef}
          id="sponsorForm"
        >

        <Form.Item
          name="name"
          label={translate("messages:name") + '*'}
          rules={[
            {
              required: true,
              message: translate("messages:NAME_ERROR"),
            },
          ]}
        >
          <Input
            id="name"
            className="form-input h-[40px] w-full"
            placeholder={translate("messages:name")}
            type="text"
          />
        </Form.Item>

        <Form.Item
          name="sponserConnection"
          label={translate("messages:sponserConnection") + '*'}
          initialValue={sponserConnectionValues[0]}
          rules={[
            {
              required: true,
              message: translate("messages:sponserConnection_error"),
            },
          ]}
        >
          <Select
            id="sponserConnection"
            placeholder={translate("messages:sponserConnection")}
            className="form-input h-[40px] w-full !overflow-hidden !border"
            rootClassName="!outline-none !shadow-none"
            options={sponserConnectionValues.map((sponserConnection) => ({
              value: sponserConnection,
              label: translate(`messages:${sponserConnection}`),
            }))}
          />
        </Form.Item>

        <Form.Item
          name="sponsershipDuration"
          label={translate("messages:sponsershipDuration") + '*'}
          initialValue={translate("messages:ANNUAL")}
          rules={[
            {
              required: true,
              message: translate("messages:sponsershipDuration_error"),
            },
          ]}
        >
          <Input
            id="sponsershipDuration"
            className="form-input h-[40px] w-full"
            placeholder={translate("messages:sponsershipDuration")}
            type="text"
            readOnly
            
          />
        </Form.Item>

        <Form.Item
          name="sponsershipType"
          label={translate("messages:sponsershipType") + '*'}
          initialValue={sponsershipTypeValues[0]}
          rules={[
            {
              required: true,
              message: translate("messages:sponsershipType_error"),
            },
          ]}
        >
          <Select
            id="sponsershipType"
            placeholder={translate("messages:sponsershipType")}
            className="form-input h-[40px] w-full !overflow-hidden !border"
            rootClassName="!outline-none !shadow-none"
            options={sponsershipTypeValues.map((sponsershipType) => ({
              value: sponsershipType,
              label: translate(`messages:${sponsershipType}`),
            }))}
          />
        </Form.Item>

        <Form.Item
          name="minimumCost"
          label={translate("messages:minimumCost") + '*'}
          rules={[
            {
              required: true,
              message: translate("messages:MINIMUM_COST_ERROR"),
            },
            {
              type: "number",
              transform(value) {
                return Number(value)
              },
              message: translate("messages:MINIMUM_COST_TYPE_ERROR")
            }
          ]}
        >
          <Input
            id="minimumCost"
            className="form-input h-[40px] w-full"
            placeholder={translate("messages:minimumCost")}
            type="text"
          />
        </Form.Item>


        <Form.Item label={translate("messages:childEducationNotes")}>
          {childNotes.map((note, index) => (
            <TextArea
              key={index}
              value={note.notes.note}
              onChange={(e) => handleChildNoteChange(index, e)}
              className="form-input h-[100px] w-ful mt-2"
              placeholder={translate("messages:childEducationNotes")}
            />
          ))}
        </Form.Item>
        <Button type="text" onClick={handleAddChildNote} className="add-note-btn">
            {translate("messages:addNewChildNote")}
        </Button>
        </Form>

      </div>
    )
}


export default StepFive;
