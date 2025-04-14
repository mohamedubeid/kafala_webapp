import { ITEMS_PER_PAGE } from "@/constants/pagination";
import useGetChildrenQuery from "@/hooks/children/useGetChildrenQuery";
import KidCard from "@/partial/KidCard";
import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  Pagination,
  Row,
  Select,
} from "antd";
import { useTranslation } from "next-i18next";
import React, { useEffect, useState } from "react";
import { SearchOutlined, PlusOutlined, MinusOutlined } from "@ant-design/icons";
import { disabilityList } from "@/constants/disabilityList";
import { sponsershipList } from "@/constants/sponsershipList";
import { orphanClassificationList } from "@/constants/orphanClassification";
import arEG from "antd/lib/date-picker/locale/ar_EG";
import enUS from "antd/lib/date-picker/locale/en_US";
import { shortMonths, shortWeekDays } from "@/constants/datepicker";
import { ageList } from "@/constants/childAgeList";
import moment from "moment";

const { RangePicker } = DatePicker;

type SearchType = {
  name: string;
  ageFrom?: number | null;
  ageTo?: number | null;
  sponsershipType?: string;
  orphanClassification?: string;
  startDate?: string;
  endDate?: string;
};

const initSearch: SearchType = {
  name: "",
  ageFrom: null,
  ageTo: null,
  sponsershipType: "",
  orphanClassification: "",
  startDate: "",
  endDate: "",
};

const KidsList = () => {
  const [searchFormRef] = Form.useForm();
  const [more, setMore] = useState<boolean>(false);
  const [size, setSize] = useState<number>(ITEMS_PER_PAGE);
  const [page, setPage] = useState<number>(1);
  const { t: translateCommon } = useTranslation("common");
  const { i18n, t: translate } = useTranslation("home");
  const [search, setSearch] = useState<SearchType>(initSearch);
  const params = new URLSearchParams(window.location.search);
  const orphanClassification = params.get("orphanClassification");
  const { data: kids, isLoading } = useGetChildrenQuery(
    search?.name,
    page,
    size,
    search?.ageFrom,
    search?.ageTo,
    search?.sponsershipType,
    search?.orphanClassification,
    search?.startDate,
    search?.endDate,
    true
  );
  useEffect(() => {
    if (orphanClassification) {
      setSearch({ ...search, orphanClassification });
    }
  }, [orphanClassification]);
  const handleSearch = (value: string, searchBy: string) => {
    const searchValue = value || "";
    if (searchBy === "name") {
      setSearch({ ...search, name: searchValue });
    }
    if (searchBy === "sponsership") {
      setSearch({ ...search, sponsershipType: searchValue });
    }
    if (searchBy === "age") {
      let ageFrom = null;
      let ageTo = null;
      if (searchValue) {
        const selectedAge = ageList.find((age) => age.name == searchValue);
        if (selectedAge) {
          ageFrom = selectedAge.ageFrom;
          ageTo = selectedAge.ageTo;
        }
      }
      setSearch({ ...search, ageFrom, ageTo });
    }
    if (searchBy === "classification") {
      setSearch({ ...search, orphanClassification: searchValue });
    }
    setPage(1);
  };

  const onDateChange = (newStartDate?: string, newEndDate?: string) => {
    const sDate = newStartDate
      ? moment(newStartDate).local().toString()
      : undefined;
    const eDate = newEndDate
      ? moment(newEndDate).local().toString()
      : undefined;
    setSearch({
      ...search,
      startDate: sDate,
      endDate: eDate,
    });
  };

  const resetForm = () => {
    searchFormRef.resetFields();
    setSearch(initSearch);
    setPage(1);
  };

  return (
    <div className="kids-list-page my-8 min-h-screen">
      <div className="container">
        <div className="kids-header flex flex-wrap items-start justify-between gap-4 md:text-lg">
          <div className="kids-title section-title">
            {translate("KIDS_TITLE")}
          </div>
          <p className="mb-5 mt-[-20px]">{translate("ABOUT_DESC")}</p>
        </div>
        {/* {!orphanClassification && ( */}
        <div className="mb-8 mt-4 filter">
          <div className="table-search-and-select">
            <Form
              form={searchFormRef}
              className="!m-0 flex flex-wrap items-center gap-4"
            >
              <Form.Item
                name="name"
                className="filter-group !m-0 lg:min-w-[400px]"
              >
                <Input
                  id="child-by-name"
                  placeholder={translate("common:SEARCH")}
                  className="form-input search-input !h-[40px] w-full"
                  addonBefore={<SearchOutlined />}
                  onChange={(e) => handleSearch(e?.target?.value, "name")}
                />
              </Form.Item>

              <Form.Item name="sponsership-type" className="filter-group !m-0">
                <Select
                  id="child-by-sponsership"
                  placeholder={translate("common:SPONSERSHIP_TYPE")}
                  className="form-input h-[40px] w-full !overflow-hidden !border"
                  rootClassName="!outline-none !shadow-none"
                  onChange={(value) => handleSearch(value, "sponsership")}
                  options={sponsershipList.map((item) => {
                    const trans = translate(
                      `children:SPONSERSHIP.${item.name}`
                    );

                    return {
                      value: item.name,
                      label: trans,
                    };
                  })}
                />
              </Form.Item>
              {more && (
                <>
                  <Form.Item name="age" className="filter-group !m-0">
                    <Select
                      id="child-by-age"
                      placeholder={translate("common:BY_AGE")}
                      className="form-input h-[40px] w-full !overflow-hidden !border"
                      rootClassName="!outline-none !shadow-none"
                      onChange={(value) => handleSearch(value, "age")}
                      options={ageList.map((item) => {
                        const trans = translate(
                          `children:CHILD_AGE.${item.name}`
                        );
                        return {
                          value: item.name,
                          label: trans,
                        };
                      })}
                    />
                  </Form.Item>

                  {/* <Form.Item
                    name="classification-type"
                    className="filter-group !m-0"
                  >
                    <Select
                      id="child-by-classification"
                      placeholder={translate("common:CLASSIFICATION_TYPE")}
                      className="form-input h-[40px] w-full !overflow-hidden !border"
                      rootClassName="!outline-none !shadow-none"
                      onChange={(value) =>
                        handleSearch(value, "classification")
                      }
                      options={orphanClassificationList.map((item) => {
                        const trans = translate(`children:ORPHAN.${item.name}`);
                        return {
                          label: trans,
                          value: item.name,
                        };
                      })}
                    />
                  </Form.Item>

                  <Form.Item name="joining_date" className="filter-group !m-0">
                    <RangePicker
                      id="child-joining-date"
                      size="large"
                      placeholder={[
                        translate("common:DATE_FROM"),
                        translate("common:DATE_TO"),
                      ]}
                      className={""}
                      allowEmpty={[true, true]}
                      onChange={(date) => {
                        onDateChange(
                          date?.[0]?.toString(),
                          date?.[1]?.toString()
                        );
                      }}
                      locale={
                        i18n.language
                          ? {
                              ...arEG,
                              lang: {
                                ...arEG.lang,
                                shortWeekDays: shortWeekDays,
                                shortMonths: shortMonths,
                              },
                            }
                          : { ...enUS }
                      }
                    />
                  </Form.Item> */}
                </>
              )}

              <div className="filter-actions flex gap-2">
                <Button onClick={() => setMore(!more)} className="filter-btn">
                  {!more ? (
                    <>
                      <span>
                        <PlusOutlined />
                      </span>
                      <span>{translate("common:MORE")}</span>
                    </>
                  ) : (
                    <>
                      <span>
                        <MinusOutlined />
                      </span>
                      <span>{translate("common:LESS")}</span>
                    </>
                  )}
                </Button>
                <Button
                  onClick={resetForm}
                  className="filter-btn without-borders"
                >
                  {translate("common:CLEAR")}
                </Button>
              </div>
            </Form>
          </div>
        </div>
        {/* )} */}
        {kids && kids?.data && kids?.data.length ? (
          <>
            <Row className="mt-4" gutter={[24, 24]}>
              {kids?.data.map((kid) => {
                return (
                  <Col xs={24} md={12} lg={12} xl={8} key={kid.id}>
                    <KidCard kid={kid} />
                  </Col>
                );
              })}
            </Row>
            <div className="data-pagination">
              <Pagination
                pageSize={size}
                current={page}
                total={kids?.count}
                defaultCurrent={1}
                responsive
                showLessItems
                showTitle={false}
                showSizeChanger={false}
                onChange={(page) => {
                  setPage(page);
                }}
              />
            </div>
          </>
        ) : (
          <div className="mt-8 text-center text-lg">
            {translateCommon("EMPTY")}
          </div>
        )}
      </div>
    </div>
  );
};

export default KidsList;
