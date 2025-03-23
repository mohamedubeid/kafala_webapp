import { useState } from "react";
import { useRouter } from "next/router";
import { Form, Input, Button } from "antd";
import { useTranslation } from "next-i18next";
import { IChild } from "@/types/child/profile";

type ChildProps = {
  child?: any;
  handleNext: () => void;
};


const StepTwo = ({ child, handleNext }: ChildProps) => {
    const [formRef] = Form.useForm();
    const { t: translate } = useTranslation();
    const { TextArea } = Input;
    const router = useRouter();
    const { id } = router.query;
    const isNew = id === undefined;

    const [childNotes, setChildNotes] = useState([{ id: null, notes: { id: null, note: '' }}]);

    const saveEntity = (values: IChild) => {
      if (values.age !== undefined && typeof values.age !== 'number') {
        values.age = Number(values.age);
      }
      const entity: IChild = {
        ...values,
        childNotes: childNotes.map(childNote => ({
          id: childNote.id,
          notes: {
            id: childNote.notes.id,
            note: childNote.notes.note,
          },
        })),
      };
      console.log("entityyyyyyyyyyyyyyyyy: ", entity)
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
          id="healthStatusForm"
        >

        <Form.Item label={translate("messages:childNotes")}>
          {childNotes.map((note, index) => (
            <TextArea
              key={index}
              value={note.notes.note}
              onChange={(e) => handleChildNoteChange(index, e)}
              className="form-input h-[100px] w-ful mt-2"
              placeholder={translate("messages:childNotes")}
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


export default StepTwo;
