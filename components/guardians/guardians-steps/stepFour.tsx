import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Form, Input, Button, Select } from "antd";
import { useTranslation } from "next-i18next";
import { LastLevelOfEducation } from "@/types/enm";
import UploadImage from "uploads/UploadImage";
import { toast } from "react-toastify";
import { IChildEducationStatus } from "@/types/child/childEducationStatus";
import useAddUpdateChildEducationStatus from "@/hooks/guardians/addUpdateChildEducationStatus";
import { ChildDTO } from "@/types/child";
import useGetChildEducationStatus from "@/hooks/children/useGetChildEducationStatus";


type ChildProps = {
  child?: ChildDTO;
  handleNext: () => void;
};


const StepFour = ({ child, handleNext }: ChildProps) => {
    const [formRef] = Form.useForm();
    const { t: translate } = useTranslation();
    const { TextArea } = Input;
    const router = useRouter();
    const { id } = router.query;
    const isNew = id?.[0] === 'new';

    const lastLevelOfEducationValues = Object.keys(LastLevelOfEducation);

    const [childNotes, setChildNotes] = useState<{ id: number | null; notes: { id: number | null; note: string } }[]>([{ id: null, notes: { id: null, note: '' }}]);
    const [lastLevelOfEducationImageUrl, setLastLevelOfEducationImageUrl] = useState<{ id?: number; link?: string }[]>([]);

    const { addUpdateResponse, addUpdateError, addUpdateLoading, setChildEducationStatusData } = useAddUpdateChildEducationStatus();

    const [isFormInitialized, setIsFormInitialized] = useState(false);
    const { data: childEducationStatusData } = useGetChildEducationStatus(Number(child?.childEducationStatus?.id), {
      enabled: !!child?.childEducationStatus?.id && !isNew && !isFormInitialized,
    });

    useEffect(() => {
      if (childEducationStatusData && !isNew) {
        formRef.setFieldsValue({
          lastLevelOfEducation: childEducationStatusData.lastLevelOfEducation,
          hoppy: childEducationStatusData.hoppy,
        });

        setLastLevelOfEducationImageUrl(
          childEducationStatusData.lastLevelOfEducationImage
            ? [{ link: childEducationStatusData.lastLevelOfEducationImage }]
            : []
        );

        if (!isNew && childEducationStatusData.childEducationNotes && childEducationStatusData.childEducationNotes?.length > 0) {
          setChildNotes(
            childEducationStatusData.childEducationNotes
              ? childEducationStatusData.childEducationNotes.map(childEducationNote => ({
                  id: childEducationNote.id ?? null,
                  notes: { id: childEducationNote.notes?.id ?? null, note: childEducationNote.notes?.note || '' },
                }))
              : []
          );
        } else {
          setChildNotes([{ id: null, notes: { id: null, note: '' }}]);
        }

        setIsFormInitialized(true);
      }
    }, [childEducationStatusData, formRef]);

    const saveEntity = (values: IChildEducationStatus) => {
      const entity: IChildEducationStatus = {
        ...childEducationStatusData,
        ...values,
        child: child,
        lastLevelOfEducationImage:
        lastLevelOfEducationImageUrl && lastLevelOfEducationImageUrl?.length ? (lastLevelOfEducationImageUrl[0]?.link || lastLevelOfEducationImageUrl[1]?.link || null) : null,
        childEducationNotes: childNotes.map(childNote => ({
          id: childNote.id,
          notes: {
            id: childNote.notes.id,
            note: childNote.notes.note,
          },
        })),
      };
      console.log('entity four: ', entity);
      setChildEducationStatusData(entity)
    };

    const removeLastLevelOfEducationImageUrl = (fileIndex: number | void) => {
      const fileList = lastLevelOfEducationImageUrl;
      if (fileIndex) {
        fileList.splice(fileIndex - 1, 1);
      }
      setLastLevelOfEducationImageUrl([...fileList]);
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
          id="educationalForm"
        >

        <Form.Item
          name="lastLevelOfEducation"
          label={translate("messages:lastLevelOfEducation")}
          initialValue={lastLevelOfEducationValues[0]}
        >
          <Select
            id="lastLevelOfEducation"
            placeholder={translate("messages:lastLevelOfEducation")}
            className="form-input h-[40px] w-full !overflow-hidden !border"
            rootClassName="!outline-none !shadow-none"
            options={lastLevelOfEducationValues.map((lastLevelOfEducation) => ({
              value: lastLevelOfEducation,
              label: translate(`messages:${lastLevelOfEducation}`),
            }))}
          />
        </Form.Item>

        <Form.Item
          name="hoppy"
          label={translate("messages:hoppy")}
        >
          <Input
            id="hoppy"
            className="form-input h-[40px] w-full"
            placeholder={translate("messages:hoppy")}
            type="text"
          />
        </Form.Item>

        <UploadImage
          id="lastLevelOfEducationImage"
          label={translate("messages:lastLevelOfEducationImage")}
          viewType="defaultView"
          key="lastLevelOfEducationImage"
          defaultImages={[
            ...(lastLevelOfEducationImageUrl && lastLevelOfEducationImageUrl[0]?.link
              ? [
                  {
                    uid: lastLevelOfEducationImageUrl[0]?.id?.toString() || "",
                    url: lastLevelOfEducationImageUrl[0]?.link?.toString(),
                    name: '',
                  },
                ]
              : []),
          ]}
          maxLength={1}
          removeImage={removeLastLevelOfEducationImageUrl}
          setImageUrl={(url: string | void) => {
            if (url) setLastLevelOfEducationImageUrl([...lastLevelOfEducationImageUrl, { link: url }]);
          }}
          title=""
          acceptTypes="image/jpeg,
          image/jpg,
          image/png,
          image/webp,
          image/bmp,
          image/tiff,.pdf,.xlsx,.xls,.docx,.doc"
        />

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


export default StepFour;
