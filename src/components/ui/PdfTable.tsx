import { StyleSheet, Text, View } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  table: {
    width: "100%",
  },

  table_title: {},

  table_title_text: {},

  table_header: {
    flexDirection: "row",
    backgroundColor: "gray",
  },

  table_header_th: {
    width: "49%",
    padding: "10px",
    textAlign: "center",
    border: "0.5px solid black",
  },

  table_header_th2: {
    width: "17%",
    padding: "10px",
    textAlign: "center",
    border: "0.5px solid black",
  },

  table_header_text: {
    fontSize: 10,
    color: "white",
    textAlign: "center",
  },

  table_body: {},

  table_body_tr: {
    flexDirection: "row",
  },

  table_body_td: {
    width: "49%",
    padding: "10px",
    border: "0.5px solid black",
  },

  table_body_td2: {
    width: "17%",
    padding: "10px",
    border: "0.5px solid black",
  },

  table_body_text: {
    fontSize: 10,
    textAlign: "center",
  },
});

interface Props {
  readonly data: any;
}

export default function PdfTable({ data }: Props) {
  return (
    <View style={styles.table}>
      <View style={styles.table_title}>
        <Text style={styles.table_title_text}>{data.name}</Text>
      </View>
      <View style={styles.table_header}>
        <View style={styles.table_header_th}>
          <Text style={styles.table_header_text}>Buyruq nomi</Text>
        </View>
        <View style={styles.table_header_th2}>
          <Text style={styles.table_header_text}>Rejada</Text>
        </View>
        <View style={styles.table_header_th2}>
          <Text style={styles.table_header_text}>Amalda</Text>
        </View>
        <View style={styles.table_header_th2}>
          <Text style={styles.table_header_text}>Foizda</Text>
        </View>
      </View>
      <View style={styles.table_body}>
        {data?.map((item: any) => {
          return (
            <View style={styles.table_body_tr}>
              <View style={styles.table_body_td}>
                <Text style={styles.table_body_text}>{item?.name}</Text>
              </View>
              <View style={styles.table_body_td2}>
                <Text style={styles.table_body_text}>{item?.inPlan}</Text>
              </View>
              <View style={styles.table_body_td2}>
                <Text style={styles.table_body_text}>{item?.inProcess}</Text>
              </View>
              <View style={styles.table_body_td2}>
                <Text
                  style={styles.table_body_text}
                >{`${item?.inPercentage.replaceAll("%", "")}%`}</Text>
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
}
