import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Form, Input, Button, Select, Checkbox } from "antd";
import { useTranslation } from "next-i18next";
import { HealthStatus, MentalIllnessTypes, OrphanClassification, SychologicalHealthTypes } from "@/types/enm";
import { IChildHealthStatus } from "@/types/child/healthStatus";
import UploadImage from "uploads/UploadImage";
import useAddUpdateChildHealthStatus from "@/hooks/guardians/addUpdateChildHealthStatus";
import { toast } from "react-toastify";
import { IChild } from "@/types/child/profile";
import { IChildMaritalStatus } from "@/types/child/childMartialStatus";
import useAddUpdateChildMaritalStatus from "@/hooks/guardians/addUpdateChildMaritalStatus";


type ChildProps = {
  child?: IChild;
  handleNext: () => void;
};


const StepThree = ({ child, handleNext }: ChildProps) => {
    const [formRef] = Form.useForm();
    const { t: translate } = useTranslation();
    const router = useRouter();
    const { id } = router.query;

    const orphanClassificationValues = Object.keys(OrphanClassification);


    const [dateOfBeathImageUrl, setDateOfBeathImageUrl] = useState<{ id?: number; link?: string }[]>([]);
    const [guardianDocument, setGuardianDocument] = useState<{ id?: number; link?: string }[]>([]);

    const { addUpdateResponse, addUpdateError, addUpdateLoading, setChildMaritalStatusData } = useAddUpdateChildMaritalStatus();

    const saveEntity = (values: IChildMaritalStatus) => {
      const entity: IChildMaritalStatus = {
        ...values,
        dateOfBeathImage:
        dateOfBeathImageUrl && dateOfBeathImageUrl?.length ? dateOfBeathImageUrl[0]?.link || dateOfBeathImageUrl[1]?.link || null : null,
        guardianDocument:
        guardianDocument && guardianDocument?.length ? guardianDocument[0]?.link || guardianDocument[1]?.link || null : null,
        child: child,
        childMaritalNotes: [],
      };

      console.log('entity three: ', entity);
      setChildMaritalStatusData(entity);
    };

    const removeDateOfBeathImageUrl = (fileIndex: number | void) => {
      const fileList = dateOfBeathImageUrl;
      if (fileIndex) {
        fileList.splice(fileIndex - 1, 1);
      }
      setDateOfBeathImageUrl([...fileList]);
    };
    const removeguardianDocumentUrl = (fileIndex: number | void) => {
      const fileList = guardianDocument;
      if (fileIndex) {
        fileList.splice(fileIndex - 1, 1);
      }
      setGuardianDocument([...fileList]);
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
          id="maritalStatusForm"
        >

        <Form.Item
          name="orphanClassification"
          label={translate("messages:OrphanClassification")}
          initialValue={orphanClassificationValues[0]}
        >
          <Select
            id="orphan-classification"
            placeholder={translate("messages:OrphanClassification")}
            className="form-input h-[40px] w-full !overflow-hidden !border"
            rootClassName="!outline-none !shadow-none"
            options={orphanClassificationValues.map((orphanClassification) => ({
              value: orphanClassification,
              label: translate(`messages:${orphanClassification}`),
            }))}
          />
        </Form.Item>

        <Form.Item
          name="fatherDateOfDeath"
          label={translate("messages:fatherDateOfDeath")}
        >
          <Input
            id="fatherDateOfDeath"
            className="form-input h-[40px] w-full"
            placeholder={translate("messages:fatherDateOfDeath")}
            type="date"
          />
        </Form.Item>

        <UploadImage
          id="dateOfBeathImage"
          label={translate("messages:dateOfBeathImage")}
          viewType="defaultView"
          key="dateOfBeathImage"
          defaultImages={[
            ...(dateOfBeathImageUrl && dateOfBeathImageUrl[0]?.link
              ? [
                  {
                    uid: dateOfBeathImageUrl[0]?.id?.toString() || "",
                    url: dateOfBeathImageUrl[0]?.link?.toString(),
                    name: '',
                  },
                ]
              : []),
          ]}
          maxLength={1}
          removeImage={removeDateOfBeathImageUrl}
          setImageUrl={(url: string | void) => {
            if (url) setDateOfBeathImageUrl([...dateOfBeathImageUrl, { link: url }]);
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
          name="guardianName"
          label={translate("messages:guardianName")}
        >
          <Input
            id="guardianName"
            className="form-input h-[40px] w-full"
            placeholder={translate("messages:guardianName")}
            type="text"
          />
        </Form.Item>

        <Form.Item
          name="guardianNationalID"
          label={translate("messages:guardianNationalID")}
        >
          <Input
            id="guardianNationalID"
            className="form-input h-[40px] w-full"
            placeholder={translate("messages:guardianNationalID")}
            type="text"
          />
        </Form.Item>

        <Form.Item
          name="guardianRelationship"
          label={translate("messages:guardianRelationship")}
        >
          <Input
            id="guardianRelationship"
            className="form-input h-[40px] w-full"
            placeholder={translate("messages:guardianRelationship")}
            type="text"
          />
        </Form.Item>

        <UploadImage
          id="guardianDocument"
          label={translate("messages:guardianDocument")}
          viewType="defaultView"
          key="guardianDocument"
          defaultImages={[
            ...(guardianDocument && guardianDocument[0]?.link
              ? [
                  {
                    uid: guardianDocument[0]?.id?.toString() || "",
                    url: guardianDocument[0]?.link?.toString(),
                    name: '',
                  },
                ]
              : []),
          ]}
          maxLength={1}
          removeImage={removeguardianDocumentUrl}
          setImageUrl={(url: string | void) => {
            if (url) setGuardianDocument([...guardianDocument, { link: url }]);
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
          name="numOfSibiling"
          label={translate("messages:numOfSibiling")}
        >
          <Input
            id="numOfSibiling"
            className="form-input h-[40px] w-full"
            placeholder={translate("messages:numOfSibiling")}
            type="text"
          />
        </Form.Item>

        </Form>

      </div>
    )
}


export default StepThree;
