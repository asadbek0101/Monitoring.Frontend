import { Document, PDFViewer, Page, StyleSheet, View } from "@react-pdf/renderer";

import PdfTitle from "../ui/PdfTitle";
import PdfTable from "../ui/PdfTable";

const styles = StyleSheet.create({
  empty_margin: {
    margin: "6px 0",
  },

  container: {
    width: "100%",
    height: "100%",
  },

  page: {
    width: "100%",
    padding: "30px",
  },
});

interface Props {
  readonly data?: any;
}

export default function DashboardPdf({ data }: Props) {
  return (
    <PDFViewer style={styles.container}>
      <Document>
        {data?.categories &&
          data?.categories?.map((item: any) => {
            return (
              <Page size="A4" style={styles.page}>
                <PdfTitle title={data?.regionName + " - " + item?.name} />
                <PdfTable data={item?.todos} />
              </Page>
            );
          })}
      </Document>
    </PDFViewer>
  );
}
