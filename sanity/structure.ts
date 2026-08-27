import type { StructureResolver } from "sanity/structure";

// Enforces the "fixed document IDs, no arbitrary page slugs" rule at the
// tooling level: editors can only open these five known pages, never create
// a new "page" document from scratch.
const SINGLETON_PAGES = [
  { id: "page-home", title: "Homepage" },
  { id: "page-visit-us", title: "Visit Us" },
  { id: "page-leasing", title: "Leasing" },
  { id: "page-group-events", title: "Group Events" },
  { id: "page-contact", title: "Contact" },
];

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Pages")
        .child(
          S.list()
            .title("Pages")
            .items(
              SINGLETON_PAGES.map((page) =>
                S.listItem()
                  .title(page.title)
                  .id(page.id)
                  .child(S.document().schemaType("page").documentId(page.id))
              )
            )
        ),
      S.listItem()
        .title("Businesses")
        .child(S.documentTypeList("business").title("Businesses")),
      S.listItem()
        .title("Events")
        .child(S.documentTypeList("event").title("Events")),
      S.divider(),
      S.listItem()
        .title("Site Settings")
        .id("siteSettings")
        .child(S.document().schemaType("siteSettings").documentId("siteSettings")),
    ]);
