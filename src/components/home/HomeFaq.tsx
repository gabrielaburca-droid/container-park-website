import Link from "next/link";
import { Accordion } from "@/components/ui/Accordion";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

// REAL CONTENT — the live homepage's own "Frequently Asked Questions"
// block: all five questions and answers, in the live order, word for word
// (including its SpotAngels link and the link to the leasing form). Laid
// out with the same Accordion + light box already used for the Visit Us
// parking panels rather than a new treatment. Closed panels are still in
// the server-rendered HTML (see ui/Accordion.tsx).
export function HomeFaq() {
  return (
    <section className="py-10 sm:py-16">
      <Container>
        <SectionHeading heading="Frequently Asked Questions" align="center" />
        <div className="mt-8 bg-[#F5F5F5] p-6 sm:p-8">
          <Accordion
            items={[
              {
                id: "entrance-fee",
                title: "Is there an entrance fee to Downtown Container Park?",
                defaultOpen: true,
                content: (
                  <p>
                    No, Downtown Container Park does not charge an entrance fee. The Treehouse,
                    Playground, Pixel Room and stage area are free of charge. During special events,
                    these areas may be closed for private use or require an entrance fee.
                  </p>
                ),
              },
              {
                id: "parking",
                title: "Is there parking available?",
                content: (
                  <p>
                    There is plenty of nearby parking including a metered parking lot across the
                    street and street parking. The cost varies depending on the day &amp; time. For
                    accurate pricing and locations visit{" "}
                    <a
                      href="https://www.spotangels.com/#parking-near=Downtown-Container-Park-707-Fremont-St-Las-Vegas-Nevada-89101-United-States"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline"
                    >
                      SpotAngels
                    </a>
                    .
                  </p>
                ),
              },
              {
                id: "mantis-show",
                title: "Is the Mantis fire show and drum circle operational?",
                content: (
                  <div className="space-y-2">
                    <p>
                      Yes! help us wake up the Mantis with a drum circle at sunset. The hours of
                      operation are:
                    </p>
                    <ul className="space-y-1">
                      <li>Wednesday &amp; Thursday: Sunset until 10pm</li>
                      <li>Friday &amp; Saturday Sunset until 1am</li>
                      <li>Sunday – Sunset until 10pm</li>
                    </ul>
                  </div>
                ),
              },
              {
                id: "leasing",
                title: "Looking for space for your small business?",
                content: (
                  <p>
                    We would love to speak with you about available leasing space. Please fill out
                    our contact form{" "}
                    <Link href="/leasing" className="underline">
                      here
                    </Link>
                    .
                  </p>
                ),
              },
              {
                id: "kids",
                title: "How late are kids allowed in the park?",
                content: (
                  <p>Kids are allowed in the park until 9 pm, daily. After 9 pm the park is 21+.</p>
                ),
              },
            ]}
          />
        </div>
      </Container>
    </section>
  );
}
