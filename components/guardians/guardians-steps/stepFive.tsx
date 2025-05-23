import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Form, Input, Button, Select, Checkbox } from "antd";
import { useTranslation } from "next-i18next";
import { SponserConnection, SponsershipType } from "@/types/enm";
import { toast } from "react-toastify";
import { IChildSponsorShip } from "@/types/child/childSponsership";
import useAddUpdateChildSponsorShip from "@/hooks/guardians/addUpdateChildSponsorShip";
import { ChildDTO } from "@/types/child";
import useGetChildSponsorShip from "@/hooks/children/useGetChildSponsorShip";


type ChildProps = {
  child?: ChildDTO;
  handleNext: () => void;
};


const StepFive = ({ child, handleNext }: ChildProps) => {
    const [formRef] = Form.useForm();
    const { t: translate } = useTranslation();
    const { TextArea } = Input;
    const router = useRouter();
    const { id } = router.query;
    const isNew = id?.[0] === 'new';

    const sponserConnectionValues = Object.keys(SponserConnection);
    const [childNotes, setChildNotes] = useState<{ id: number | null; notes: { id: number | null; note: string } }[]>([{ id: null, notes: { id: null, note: '' }}]);

    const { addUpdateResponse, addUpdateError, addUpdateLoading, setChildSponsorShipData } = useAddUpdateChildSponsorShip();

    const [isFormInitialized, setIsFormInitialized] = useState(false);
    const { data: childSponsorShipData } = useGetChildSponsorShip(Number(child?.childSponsorShip?.id), {
      enabled: !!child?.childSponsorShip?.id && !isNew && !isFormInitialized,
    });

    useEffect(() => {
      if (childSponsorShipData && !isNew) {

        formRef.setFieldsValue({
          name: childSponsorShipData.name,
          sponserConnection: childSponsorShipData.sponserConnection,
          sponsershipDuration: translate("messages:ANNUAL"),
          sponsershipType: childSponsorShipData.relSponsershipTypes?.map((type) => type.sponsershipType?.type),
          minimumCost: childSponsorShipData.minimumCost ? childSponsorShipData.minimumCost / 12 : 0,
        });

        if (!isNew && childSponsorShipData.childSponsorShipNotes && childSponsorShipData.childSponsorShipNotes?.length > 0) {
          setChildNotes(
            childSponsorShipData.childSponsorShipNotes
              ? childSponsorShipData.childSponsorShipNotes.map(childSponsorShipNote => ({
                  id: childSponsorShipNote.id ?? null,
                  notes: { id: childSponsorShipNote.notes?.id ?? null, note: childSponsorShipNote.notes?.note || '' },
                }))
              : []
          );
        } else {
          setChildNotes([{ id: null, notes: { id: null, note: '' }}]);
        }

        setIsFormInitialized(true);
      }
    }, [childSponsorShipData, formRef]);

    const saveEntity = (values: IChildSponsorShip) => {
      const entity: IChildSponsorShip = {
        ...childSponsorShipData,
        ...values,
        sponsershipDuration: 'ANNUAL',
        minimumCost: values.minimumCost ? values.minimumCost * 12 : 0,
        child: child,
        childSponsorShipNotes: childNotes.map(childNote => ({
          id: childNote.id,
          notes: {
            id: childNote.notes.id,
            note: childNote.notes.note,
          },
        })),
      };

      console.log('entity five: ', entity);
      setChildSponsorShipData(entity);
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
          rules={[
            {
              required: true,
              message: translate("messages:sponsershipType_error"),
            },
          ]}
        >
          <Select
            id="sponsershipType"
            mode="multiple"
            placeholder={translate("messages:sponsershipType")}
            className="form-input h-[40px] w-full !overflow-hidden !border"
            rootClassName="!outline-none !shadow-none"
            options={SponsershipType.map((sponsor) => ({
              value: sponsor.type,
              label: translate(`messages:${sponsor.type}`),
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
