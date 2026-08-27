import { business } from "./business";
import { event } from "./event";
import { page } from "./page";
import { siteSettings } from "./siteSettings";
import { seo } from "./objects/seo";
import { address } from "./objects/address";
import { dayHours } from "./objects/hours";
import { socialLinks } from "./objects/socialLinks";
import { contentBlockTypes, pageBuilder } from "./objects/contentBlocks";

export const schemaTypes = [
  // documents
  business,
  event,
  page,
  siteSettings,
  // shared objects
  seo,
  address,
  dayHours,
  socialLinks,
  ...contentBlockTypes,
  pageBuilder,
];
