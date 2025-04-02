import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Form, Input, Button, Select, Checkbox } from "antd";
import { useTranslation } from "next-i18next";
import { HealthStatus, MentalIllnessTypes, SychologicalHealthTypes } from "@/types/enm";
import { IChildHealthStatus } from "@/types/child/healthStatus";
import UploadImage from "uploads/UploadImage";
import useAddUpdateChildHealthStatus from "@/hooks/guardians/addUpdateChildHealthStatus";
import { toast } from "react-toastify";
import { ChildDTO } from "@/types/child";
import useGetChildHealthStatus from "@/hooks/children/useGetChildHealthStatus";


type ChildProps = {
  child?: ChildDTO;
  handleNext: () => void;
};


const StepTwo = ({ child, handleNext }: ChildProps) => {
    const [formRef] = Form.useForm();
    const { t: translate } = useTranslation();
    const { TextArea } = Input;
    const router = useRouter();
    const { id } = router.query;
    const isNew = id?.[0] === 'new';

    const healthStatusValues = Object.keys(HealthStatus);
    const mentalIllnessTypesValues = Object.keys(MentalIllnessTypes);
    const sychologicalHealthTypesValues = Object.keys(SychologicalHealthTypes);

    const [disabilityUrl, setDisabilityUrl] = useState<{ id?: number; link?: string }[]>([]);
    const [mentalIllnessUrl, setMentalIllnessUrl] = useState<{ id?: number; link?: string }[]>([]);
    const [sychologicalHealthUrl, setSychologicalHealthUrl] = useState<{ id?: number; link?: string }[]>([]);

    const [childNotes, setChildNotes] = useState<{ id: number | null; notes: { id: number | null; note: string } }[]>([{ id: null, notes: { id: null, note: '' }}]);
    const { addUpdateResponse, addUpdateError, addUpdateLoading, setChildHealthStatusData } = useAddUpdateChildHealthStatus();
    const [isFormInitialized, setIsFormInitialized] = useState(false); // Track if the form has been initialized

    const { data: childHealthStatusData } = useGetChildHealthStatus(Number(child?.childHealthStatus?.id), {
      enabled: !!child?.childHealthStatus?.id && !isNew && !isFormInitialized,
    });

  useEffect(() => {
    if (childHealthStatusData && !isNew) {
      formRef.setFieldsValue({
        healthStatus: childHealthStatusData.healthStatus,
        chronicDisease: !!childHealthStatusData.chronicDisease,
        hasDisability: !!childHealthStatusData.hasDisability,
        hasMentalIllness: !!childHealthStatusData.hasMentalIllness,
        mentalIllnessType: childHealthStatusData.mentalIllnessType,
        sychologicalHealth: !!childHealthStatusData.sychologicalHealth,
        sychologicalHealthType: childHealthStatusData.sychologicalHealthType,
        healthReport: childHealthStatusData.healthReport,
      });

      setDisabilityUrl(
        childHealthStatusData.disabilityImage
          ? [{ link: childHealthStatusData.disabilityImage }]
          : []
      );
      setMentalIllnessUrl(
        childHealthStatusData.mentalIllnessImage
          ? [{ link: childHealthStatusData.mentalIllnessImage }]
          : []
      );
      setSychologicalHealthUrl(
        childHealthStatusData.sychologicalHealthImage
          ? [{ link: childHealthStatusData.sychologicalHealthImage }]
          : []
      );

      if (!isNew && childHealthStatusData.childHealthNotes && childHealthStatusData.childHealthNotes?.length > 0) {
        setChildNotes(
          childHealthStatusData.childHealthNotes
            ? childHealthStatusData.childHealthNotes.map(childHealthNote => ({
                id: childHealthNote.id ?? null,
                notes: { id: childHealthNote.notes?.id ?? null, note: childHealthNote.notes?.note || '' },
              }))
            : []
        );
      } else {
        setChildNotes([{ id: null, notes: { id: null, note: '' }}]);
      }
      setIsFormInitialized(true);
    }
  }, [childHealthStatusData, formRef]);

    const saveEntity = (values: IChildHealthStatus) => {
      const entity: IChildHealthStatus = {
        ...childHealthStatusData,
        ...values,
        disabilityImage: disabilityUrl && disabilityUrl.length ? disabilityUrl[0]?.link || disabilityUrl[1]?.link || null : null,
        mentalIllnessImage:
          mentalIllnessUrl && mentalIllnessUrl.length ? mentalIllnessUrl[0]?.link || mentalIllnessUrl[1]?.link || null : null,
        sychologicalHealthImage:
          sychologicalHealthUrl && sychologicalHealthUrl.length
            ? sychologicalHealthUrl[0]?.link || sychologicalHealthUrl[1]?.link || null
            : null,
          childHealthNotes: childNotes.map(childNote => ({
          id: childNote.id,
          notes: {
            id: childNote.notes.id,
            note: childNote.notes.note,
          },
        })),
        child: child,
      };
      console.log('entity two: ', entity);
      setChildHealthStatusData(entity);
    };



    const handleAddChildNote = () => {
      setChildNotes([...childNotes, { id: null, notes: { id: null, note: '' }}]);
    };

    const removeDisabilityUrl = (fileIndex: number | void) => {
      const fileList = disabilityUrl;
      if (fileIndex) {
        fileList.splice(fileIndex - 1, 1);
      }
      setDisabilityUrl([...fileList]);
    };
  
    const removeMentalIllnessUrl = (fileIndex: number | void) => {
      const fileList = mentalIllnessUrl;
      if (fileIndex) {
        fileList.splice(fileIndex - 1, 1);
      }
      setMentalIllnessUrl([...fileList]);
    };
  
    const removeSychologicalHealthUrl = (fileIndex: number | void) => {
      const fileList = sychologicalHealthUrl;
      if (fileIndex) {
        fileList.splice(fileIndex - 1, 1);
      }
      setSychologicalHealthUrl([...fileList]);
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
          id="healthStatusForm"
        >

        <Form.Item
          name="healthStatus"
          label={translate("messages:HEALTH_STATUS")}
          initialValue={healthStatusValues[0]}
        >
          <Select
            id="health-status"
            placeholder={translate("messages:HEALTH_STATUS")}
            className="form-input h-[40px] w-full !overflow-hidden !border"
            rootClassName="!outline-none !shadow-none"
            options={healthStatusValues.map((status) => ({
              value: status,
              label: translate(`messages:${status}`),
            }))}
          />
        </Form.Item>

        <Form.Item
          name="chronicDisease"
          valuePropName="checked"
          getValueFromEvent={(e) => e.target.checked ? 1 : 0}
          initialValue={0}
        >
          <Checkbox id="chronic-disease">
            {translate("messages:chronicDisease")}
          </Checkbox>
        </Form.Item>

        <Form.Item
          name="hasDisability"
          valuePropName="checked"
          getValueFromEvent={(e) => e.target.checked ? 1 : 0}
          initialValue={0}
        >
          <Checkbox id="has-disability">
            {translate("messages:hasDisability")}
          </Checkbox>
        </Form.Item>

        <UploadImage
          id="disabilityImage"
          label={translate("messages:disabilityImage")}
          viewType="defaultView"
          key="disabilityImage"
          defaultImages={[
            ...(disabilityUrl && disabilityUrl[0]?.link
              ? [
                  {
                    uid: disabilityUrl[0]?.id?.toString() || "",
                    url: disabilityUrl[0]?.link?.toString(),
                    name: '',
                  },
                ]
              : []),
          ]}
          maxLength={1}
          removeImage={removeDisabilityUrl}
          setImageUrl={(url: string | void) => {
            if (url) setDisabilityUrl([...disabilityUrl, { link: url }]);
          }}
          title=""
          acceptTypes="image/jpeg,
          image/jpg,
          image/png,
          image/webp,
          image/bmp,
          image/tiff,.pdf,.xlsx,.xls,.docx,.doc"
        />

        <Form.Item
          name="hasMentalIllness"
          valuePropName="checked"
          getValueFromEvent={(e) => e.target.checked ? 1 : 0}
          initialValue={0}
        >
          <Checkbox id="hasMental-illness">
            {translate("messages:hasMentalIllness")}
          </Checkbox>
        </Form.Item>

        <Form.Item
          name="mentalIllnessType"
          label={translate("messages:mentalIllnessType")}
          initialValue={mentalIllnessTypesValues[0]}
        >
          <Select
            id="mental-illness-type"
            placeholder={translate("messages:mentalIllnessType")}
            className="form-input h-[40px] w-full !overflow-hidden !border"
            rootClassName="!outline-none !shadow-none"
            options={mentalIllnessTypesValues.map((mentalIllness) => ({
              value: mentalIllness,
              label: translate(`messages:${mentalIllness}`),
            }))}
          />
        </Form.Item>

        <UploadImage
          id="mentalIllnessImage"
          label={translate("messages:mentalIllnessImage")}
          viewType="defaultView"
          key="mentalIllnessImage"
          defaultImages={[
            ...(mentalIllnessUrl && mentalIllnessUrl[0]?.link
              ? [
                  {
                    uid: mentalIllnessUrl[0]?.id?.toString() || "",
                    url: mentalIllnessUrl[0]?.link?.toString(),
                    name: '',
                  },
                ]
              : []),
          ]}
          maxLength={1}
          removeImage={removeMentalIllnessUrl}
          setImageUrl={(url: string | void) => {
            if (url) setMentalIllnessUrl([...mentalIllnessUrl, { link: url }]);
          }}
          title=""
          acceptTypes="image/jpeg,
          image/jpg,
          image/png,
          image/webp,
          image/bmp,
          image/tiff,.pdf,.xlsx,.xls,.docx,.doc"
        />

        <Form.Item
          name="sychologicalHealth"
          valuePropName="checked"
          getValueFromEvent={(e) => e.target.checked ? 1 : 0}
          initialValue={0}
        >
          <Checkbox id="sychological-health">
            {translate("messages:sychologicalHealth")}
          </Checkbox>
        </Form.Item>

        <Form.Item
          name="sychologicalHealthType"
          label={translate("messages:sychologicalHealthType")}
          initialValue={sychologicalHealthTypesValues[0]}
        >
          <Select
            id="sychological-health-type"
            placeholder={translate("messages:sychologicalHealthType")}
            className="form-input h-[40px] w-full !overflow-hidden !border"
            rootClassName="!outline-none !shadow-none"
            options={sychologicalHealthTypesValues.map((sychologicalHealth) => ({
              value: sychologicalHealth,
              label: translate(`messages:${sychologicalHealth}`),
            }))}
          />
        </Form.Item>

        <UploadImage
          id="sychologicalHealthImage"
          label={translate("messages:sychologicalHealthImage")}
          viewType="defaultView"
          key="sychologicalHealthImage"
          defaultImages={[
            ...(sychologicalHealthUrl && sychologicalHealthUrl[0]?.link
              ? [
                  {
                    uid: sychologicalHealthUrl[0]?.id?.toString() || "",
                    url: sychologicalHealthUrl[0]?.link?.toString(),
                    name: '',
                  },
                ]
              : []),
          ]}
          maxLength={1}
          removeImage={removeSychologicalHealthUrl}
          setImageUrl={(url: string | void) => {
            if (url) setSychologicalHealthUrl([...sychologicalHealthUrl, { link: url }]);
          }}
          title=""
          acceptTypes="image/jpeg,
          image/jpg,
          image/png,
          image/webp,
          image/bmp,
          image/tiff,.pdf,.xlsx,.xls,.docx,.doc"
        />

        <Form.Item
          name="healthReport"
          label={translate("messages:healthReport")}
        >
          <Input
            id="healthReport"
            className="form-input h-[40px] w-full"
            placeholder={translate("messages:healthReport")}
            type="text"
          />
        </Form.Item>

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
