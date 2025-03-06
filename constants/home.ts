import {
  BookIcon,
  FoodIcon,
  HomeIcon,
  StethoscopeIcon,
} from "@/components/home/Icons";

export const fieldsList = [
  {
    id: 1,
    icon: StethoscopeIcon({ className: "field-icon" }),
    title: "FIELDS_TITLE_1",
    description: "FIELDS_DESC_1",
  },
  {
    id: 2,
    icon: HomeIcon({ className: "field-icon" }),
    title: "FIELDS_TITLE_2",
    description: "FIELDS_DESC_2",
  },
  {
    id: 3,
    icon: BookIcon({ className: "field-icon" }),
    title: "FIELDS_TITLE_3",
    description: "FIELDS_DESC_3",
  },
  {
    id: 4,
    icon: FoodIcon({ className: "field-icon" }),
    title: "FIELDS_TITLE_4",
    description: "FIELDS_DESC_4",
  },
];
