import { StyleSheet, Text, View } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  pdf_title: {
    width: "100%",
    marginTop: "20px",
    marginBottom: "10px",
  },

  pdf_title_text: {
    fontSize: 12,
  },
});

interface Props {
  readonly title: string;
}

export default function PdfTitle({ title }: Props) {
  return (
    <View style={styles.pdf_title}>
      <Text style={styles.pdf_title_text}>{title}</Text>
    </View>
  );
}
