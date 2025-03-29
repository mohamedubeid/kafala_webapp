import { useState, useEffect, SetStateAction, Dispatch } from "react";
import { useRouter } from "next/router";
import { Form, Input, Select, Spin, Button } from "antd";
import { useTranslation } from "next-i18next";
import { MailFilled } from "@ant-design/icons";
import UploadImage from "uploads/UploadImage";
import { Gender } from "@/types/enm";
import useAddUpdateChild from "@/hooks/guardians/addUpdateChild";
import { IChild } from "@/types/child/profile";
import { toast } from "react-toastify";

type ChildProps = {
  child?: IChild;
  handleNext: () => void;
  updateChild: Dispatch<SetStateAction<IChild>>;
};


const StepOne = ({ child, handleNext, updateChild }: ChildProps) => {
    const [formRef] = Form.useForm();
    const { t: translate } = useTranslation();
    const { TextArea } = Input;
    const router = useRouter();
    const { id } = router.query;
    const isNew = id === undefined;
    const genderValues = Object.keys(Gender);

    const { addUpdateResponse, addUpdateError, addUpdateLoading, setChildData } = useAddUpdateChild();

    const [nationalImage, setNationalImage] = useState<{ id?: number; link?: string }[]>([]);
    const [InitialNationalImageRemoved, setInitialNationlImageRemoved] = useState(false);
    const [birthDateImage, setBirthDateImage] = useState<{ id?: number; link?: string }[]>([]);
    const [InitialBirthDateImageRemoved, setInitialBirthDateImageRemoved] = useState(false);
    const [childImage, setChildImage] = useState<{ id?: number; link?: string }[]>([]);
    const [InitialChildImageRemoved, setInitialChildImageRemoved] = useState(false);
    const [childVideo, setChildVideo] = useState<{ id?: number; link?: string }[]>([]);
    const [InitialChildVideoRemoved, setInitialChildVideoRemoved] = useState(false);
    const [childNotes, setChildNotes] = useState([{ id: null, notes: { id: null, note: '' }}]);
    const saveEntity = (values: IChild) => {
      if (values.age !== undefined && typeof values.age !== 'number') {
        values.age = Number(values.age);
      }
      const entity: IChild = {
        ...values,
        email: values.email,
        firstName: values.firstName,
        nationalId: values.nationalId,
        nationalImage: nationalImage && nationalImage?.length ? nationalImage[0]?.link || nationalImage[1]?.link || null : null,
        birthCertificate: birthDateImage && birthDateImage?.length ? birthDateImage[0]?.link || birthDateImage[1]?.link || null : null,
        fatherName: values.fatherName,
        motherName: values.motherName,
        familyName: values.familyName,
        imageUrl: childImage && childImage?.length ? childImage[0]?.link || childImage[1]?.link || null : null,
        gender: values.gender,
        age: values.age,
        vedio: childVideo && childVideo?.length ? childVideo[0]?.link || childVideo[1]?.link || null : null,
        address: values.address,
        description: values.description,
        childNotes: childNotes.map(childNote => ({
          id: childNote.id,
          notes: {
            id: childNote.notes.id,
            note: childNote.notes.note,
          },
        })),
      };
      setChildData(entity);
    };

    const removeNationalImageUrl = (imageIndex: number | void) => {
      const nationalImageList = nationalImage;
      if (imageIndex) {
        nationalImageList.splice(imageIndex - 1, 1);
      }
      setNationalImage([...nationalImageList]);
      setInitialNationlImageRemoved(true);
    };

    const removeBirthDateImageImageUrl = (imageIndex: number | void) => {
      const imgList = birthDateImage;
      if (imageIndex) {
        imgList.splice(imageIndex - 1, 1);
      }
      setBirthDateImage([...imgList]);
      setInitialBirthDateImageRemoved(true);
    };

    const removeChildImageImageUrl = (imageIndex: number | void) => {
      const imgList = childImage;
      if (imageIndex) {
        imgList.splice(imageIndex - 1, 1);
      }
      setChildImage([...imgList]);
      setInitialChildImageRemoved(true);
    };

    const removeVideoUrl = (videoIndex: number | void) => {
      const VideoList = childVideo;
      if (videoIndex) {
        VideoList.splice(videoIndex - 1, 1);
      }
      setChildVideo([...VideoList]);
      setInitialChildVideoRemoved(true);
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
          toast(translate("messages:CILD_CREATED"), {
            type: "success",
            position: "top-left",
          });
          formRef.resetFields();
          updateChild(addUpdateResponse.data);
          handleNext();
        }
      }, [addUpdateResponse]);

        useEffect(() => {
          if (addUpdateError) {
            if (addUpdateError.statusCode === 400) {
              switch (addUpdateError.message) {
                case "error.NationalIdExists":
                  toast(translate("messages:nationalIdExists"), {
                    type: "error",
                    position: "top-left",
                  });
                  break;
                default:
                  toast(translate("BAD_REQUEST"), {
                    type: "error",
                    position: "top-left",
                  });
                  break;
              }
            } else {
              toast(translate("BAD_REQUEST"), {
                type: "error",
                position: "top-left",
              });
            }
          }
        }, [addUpdateError]);

    return (
      <div className="stepContainer">

        <Form
          onFinish={saveEntity}
          layout="vertical"
          className="sign-up-form auth-form flex w-full flex-col"
          form={formRef}
          id="profileForm"
        >

        <Form.Item
          name="email"
          label={translate("messages:SIGNUP_EMAIL") + '*'}
          rules={[
            {
              required: true,
              type: "email",
              message: translate("messages:EMAIL_ERROR"),
            },
          ]}
        >
          <Input
            id="child-email"
            className="form-input h-[40px] w-full"
            prefix={<MailFilled className="text-lg" />}
            placeholder={translate("messages:SIGNUP_EMAIL")}
            type="email"
          />
        </Form.Item>

        <Form.Item
          name="firstName"
          label={translate("messages:SIGNUP_NAME") + '*'}
          rules={[
            {
              required: true,
              message: translate("messages:NAME_ERROR"),
            },
          ]}
        >
          <Input
            id="child-firstname"
            className="form-input h-[40px] w-full"
            placeholder={translate("messages:SIGNUP_NAME")}
            type="text"
          />
        </Form.Item>

        <Form.Item
          name="nationalId"
          label={translate("messages:SIGNUP_NATIONAL_ID") + '*'}
          rules={[
            {
              required: true,
              message: translate("messages:NATIONAL_ID_ERROR"),
            },
          ]}
        >
          <Input
            id="child-nationalId"
            className="form-input h-[40px] w-full"
            placeholder={translate("messages:SIGNUP_NATIONAL_ID")}
            type="text"
          />
        </Form.Item>

        <UploadImage
          id="child-national-image"
          label={translate("messages:SIGNUP_NATIONAL_IMAGE")}
          viewType="defaultView"
          key="child-national-image"
          defaultImages={[
            ...(nationalImage && !InitialNationalImageRemoved && nationalImage[0]?.link
              ? [
                  {
                    uid: nationalImage[0]?.id?.toString() || "",
                    url: nationalImage[0]?.link?.toString(),
                    name: "",
                  },
                ]
              : []),
          ]}
          maxLength={1}
          removeImage={removeNationalImageUrl}
          setImageUrl={(url: string | void) => {
            if (url) setNationalImage([...nationalImage, { link: url }]);
            setInitialNationlImageRemoved(false);
          }}
          title=""
          acceptTypes="image/jpeg,
                    image/jpg,
                    image/png,
                    image/webp,
                    image/bmp"
        />

        <UploadImage
          id="child-birth-certificate"
          label={translate('messages:birthCertificate')}
          viewType="defaultView"
          key="child-birth-certificate"
          defaultImages={[
            ...(birthDateImage && !InitialBirthDateImageRemoved && birthDateImage[0]?.link
              ? [
                  {
                    uid: birthDateImage[0]?.id?.toString() || "",
                    url: birthDateImage[0]?.link?.toString(),
                    name: '',
                  },
                ]
              : []),
          ]}
          maxLength={1}
          removeImage={removeBirthDateImageImageUrl}
          setImageUrl={(url: string | void) => {
            if (url) setBirthDateImage([...birthDateImage, { link: url }]);
            setInitialBirthDateImageRemoved(false);
          }}
          title=""
          acceptTypes="image/jpeg,
                    image/jpg,
                    image/png,
                    image/webp,
                    image/bmp"
        />

        <Form.Item
          name="fatherName"
          label={translate("messages:fatherName") + '*'}
          rules={[
            {
              required: true,
              message: translate("messages:FATHER_NAME_ERROR"),
            },
          ]}
        >
          <Input
            id="child-fatherName"
            className="form-input h-[40px] w-full"
            placeholder={translate("messages:fatherName")}
            type="text"
          />
        </Form.Item>

        <Form.Item
          name="motherName"
          label={translate("messages:motherName") + '*'}
          rules={[
            {
              required: true,
              message: translate("messages:MOTHER_NAME_ERROR"),
            },
          ]}
        >
          <Input
            id="child-motherName"
            className="form-input h-[40px] w-full"
            placeholder={translate("messages:motherName")}
            type="text"
          />
        </Form.Item>

        <Form.Item
          name="familyName"
          label={translate("messages:familyName") + '*'}
          rules={[
            {
              required: true,
              message: translate("messages:FAMILY_NAME_ERROR"),
            },
          ]}
        >
          <Input
            id="child-motherName"
            className="form-input h-[40px] w-full"
            placeholder={translate("messages:familyName")}
            type="text"
          />
        </Form.Item>

        <UploadImage
          id="child-image"
          label={translate('messages:childImage')}
          viewType="defaultView"
          key="child-image"
          defaultImages={[
            ...(childImage && !InitialChildImageRemoved && childImage[0]?.link
              ? [
                  {
                    uid: childImage[0]?.id?.toString() || "",
                    url: childImage[0]?.link?.toString(),
                    name: '',
                  },
                ]
              : []),
          ]}
          maxLength={1}
          removeImage={removeChildImageImageUrl}
          setImageUrl={(url: string | void) => {
            if (url) setChildImage([...childImage, { link: url }]);
            setInitialChildImageRemoved(false);
          }}
          title=""
          acceptTypes="image/jpeg,
                    image/jpg,
                    image/png,
                    image/webp,
                    image/bmp"
        />

        <Form.Item
          name="gender"
          label={translate("messages:gender") + '*'}
          rules={[
            {
              required: true,
              message: translate("GENDER_ERROR"),
              type: "string",
            },
          ]}
        >
          <Select
            id="gender"
            placeholder={translate("messages:gender")}
            className="form-input h-[40px] w-full !overflow-hidden !border"
            rootClassName="!outline-none !shadow-none"
            options={genderValues.map((gender) => ({
              value: gender,
              label: translate(`messages:${gender.toLowerCase()}`),
            }))}
          />
        </Form.Item>

        <Form.Item
          name="age"
          label={translate("messages:age") + '*'}
          rules={[
            {
              required: true,
              message: translate("messages:AGE_ERROR"),
            },
            {
              type: "number",
              transform(value) {
                return Number(value)
              },
              message: translate("messages:AGE_TYPE_ERROR")
            }
          ]}
        >
          <Input
            id="child-age"
            className="form-input h-[40px] w-full"
            placeholder={translate("messages:age")}
            type="text"
          />
        </Form.Item>

        <UploadImage
          id="child-video"
          label={translate('messages:childVideo')}
          viewType="defaultView"
          key="child-video"
          defaultImages={[
            ...(childVideo && !InitialChildVideoRemoved && childVideo[0]?.link
              ? [
                  {
                    uid: childVideo[0]?.id?.toString() || "",
                    url: childVideo[0]?.link?.toString(),
                    name: '',
                  },
                ]
              : []),
          ]}
          maxLength={1}
          removeImage={removeVideoUrl}
          setImageUrl={(url: string | void) => {
            if (url) setChildVideo([...childVideo, { link: url }]);
            setInitialChildVideoRemoved(false);
          }}
          title=""
          acceptTypes="video/mp4,
                video/webm,
                video/ogg,
                video/avi,
                video/mov"
        />
        
        <Form.Item
          name="address"
          label={translate("messages:address") + '*'}
          rules={[
            {
              required: true,
              message: translate("messages:ADDRESS_ERROR"),
            },
          ]}
        >
          <Input
            id="child-address"
            className="form-input h-[40px] w-full"
            placeholder={translate("messages:address")}
            type="text"
          />
        </Form.Item>

        <Form.Item
          name="description"
          label={translate("messages:description") + '*'}
          rules={[
            {
              required: true,
              message: translate("messages:DESCRIPTION_ERROR"),
            },
          ]}
        >
          <TextArea
            id="child-description"
            className="form-input h-[100px] w-full"
            placeholder={translate("messages:description")}
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


export default StepOne;
