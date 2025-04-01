import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Form, Input, Button, Select, Checkbox } from "antd";
import { useTranslation } from "next-i18next";
import { HealthStatus, MentalIllnessTypes, SychologicalHealthTypes } from "@/types/enm";
import { IChildHealthStatus } from "@/types/child/healthStatus";
import UploadImage from "uploads/UploadImage";
import useAddUpdateChildHealthStatus from "@/hooks/guardians/addUpdateChildHealthStatus";
import { toast } from "react-toastify";
import { IChild } from "@/types/child/profile";
import { IChildMaritalStatus } from "@/types/child/childMartialStatus";
import useAddUpdateChildMaritalStatus from "@/hooks/guardians/addUpdateChildMaritalStatus";
import { ChildDTO } from "@/types/child";


type ChildProps = {
  child?: ChildDTO;
  handleNext: () => void;
};


const StepSix = ({ child, handleNext }: ChildProps) => {
    const [formRef] = Form.useForm();
    const { t: translate } = useTranslation();
    const { TextArea } = Input;
    const router = useRouter();
    const { id } = router.query;
    const isNew = id === undefined;

    const [childNotes, setChildNotes] = useState([{ id: null, notes: { id: null, note: '' }}]);

    const { addUpdateResponse, addUpdateError, addUpdateLoading, setChildMaritalStatusData } = useAddUpdateChildMaritalStatus();

    const saveEntity = (values: IChildMaritalStatus) => {
      const entity: IChildMaritalStatus = {
        ...values,
        childMaritalNotes: childNotes.map(childNote => ({
          id: childNote.id,
          notes: {
            id: childNote.notes.id,
            note: childNote.notes.note,
          },
        })),
        child: child,
      };
      console.log('entity six: ', entity);
      setChildMaritalStatusData(entity);
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

    useEffect(() => {
      if (addUpdateResponse && addUpdateResponse.data.id) {
        toast(translate("messages:CHILD_SAVED"), {
          type: "success",
          position: "top-left",
        });
        formRef.resetFields();
        handleNext();
      }
    }, [addUpdateResponse]);

    useEffect(() => {
      if (addUpdateError) {
        toast(translate("BAD_REQUEST"), {
          type: "error",
          position: "top-left",
        });
      }
    }, [addUpdateError]);


    return (
      <div className="stepContainer">

        <Form
          onFinish={saveEntity}
          layout="vertical"
          className="sign-up-form auth-form flex w-full flex-col"
          form={formRef}
          id="HarmsForm"
        >


        <Form.Item
          name="lostHousing"
          valuePropName="checked"
          getValueFromEvent={(e) => e.target.checked ? 1 : 0}
          initialValue={0}
        >
          <Checkbox id="lostHousing">
            {translate("messages:lostHousing")}
          </Checkbox>
        </Form.Item>

        <Form.Item
          name="lostLimbs"
          valuePropName="checked"
          getValueFromEvent={(e) => e.target.checked ? 1 : 0}
          initialValue={0}
        >
          <Checkbox id="lostLimbs">
            {translate("messages:lostLimbs")}
          </Checkbox>
        </Form.Item>

        <Form.Item
          name="lostSight"
          valuePropName="checked"
          getValueFromEvent={(e) => e.target.checked ? 1 : 0}
          initialValue={0}
        >
          <Checkbox id="lostSight">
            {translate("messages:lostSight")}
          </Checkbox>
        </Form.Item>

        <Form.Item
          name="losthearorspeak"
          valuePropName="checked"
          getValueFromEvent={(e) => e.target.checked ? 1 : 0}
          initialValue={0}
        >
          <Checkbox id="Lostabilitytohearorspeak">
            {translate("messages:Lostabilitytohearorspeak")}
          </Checkbox>
        </Form.Item>

        <Form.Item
          name="hasChronicDiseases"
          valuePropName="checked"
          getValueFromEvent={(e) => e.target.checked ? 1 : 0}
          initialValue={0}
        >
          <Checkbox id="chronicDiseases">
            {translate("messages:chronicDiseases")}
          </Checkbox>
        </Form.Item>

        <Form.Item label={translate("messages:HARMS")}>
          {childNotes.map((note, index) => (
            <TextArea
              key={index}
              value={note.notes.note}
              onChange={(e) => handleChildNoteChange(index, e)}
              className="form-input h-[100px] w-ful mt-2"
              placeholder={translate("messages:HARMS")}
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


export default StepSix;
