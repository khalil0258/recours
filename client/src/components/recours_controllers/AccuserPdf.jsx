import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";

// Create styles
const styles = StyleSheet.create({
  page: {
    width: "803px",
    height: "1132px",
    backgroundColor: "white",
    padding: "20px 30px 20px 30px",
    textAlign: "justify",
    position: "relative",
  },
  section: {
    flexDirection: "row",
    width: "100%",
    alignItems: "flex-start",
    justifyContent: "space-between",
    fontSize: "12px",
  },
  right: {
    width: "30%",
    textAlign: "left",
    fontSize: "10px",
    alignItems: "center",
  },
  center: {
    width: "40%",
    textAlign: "center",
    flexDirection: "column",
    alignItems: "center",
    fontSize: "12px",
  },
  left: {
    width: "30%",
    fontSize: "10px",

    flexDirection: "row",

    justifyContent: "flex-end",
  },
  logo: {
    width: "80px",
    marginRight: "30px",
    position: "relative",
    left: "30px",
    objectFit: "contain",
  },
  reception: { textAlign: "center", width: "auto" },
  accuse: {
    border: "2px solid black",
    padding: "10px 40px",
    textAlign: "center",
    margin: "10px 0",
  },
  article: { fontSize: "12px" },
  infosContainer: {
    margin: "60px 0",
    textAlign: "left",
    width: "100%",
  },
  recours: {
    flexDirection: "row",
    gap: "20px",
  },
  volet: { marginTop: "20px" },
  text: { margin: "5px 0 0", fontWeight: "200", fontSize: "12px" },
  depose: {
    margin: "20px 30px  0",
    fontSize: "11px",
  },
  lawContainer: {
    width: "100%",
    justifyContent: "center",
    margin: "100px auto",
    padding: "10px",
    border: "2px solid black",
    textAlign: "justify",
    fontSize: "10px",
  },
});

const AccuserPdf = ({ data }) => {
  const date = new Date().toISOString();
  console.log(data);
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          {/* hadi li tji lfog adroite */}
          <View style={styles.right}>
            {data?.commission === "National" ? (
              <Text>La Commission Nationale de Recours Préalable Qualifié</Text>
            ) : (
              <Text>La Commission Locale de Recours Préalable Qualifié</Text>
            )}
          </View>
          {/* hadi li tji f wasst  */}
          <View style={styles.center}>
            <Text>
              La Caisse Nationale de Sécurité Sociale des Non-Salariés
            </Text>
          </View>
          {/* hadi ta3 picture ta3 casnos  */}
          <View style={styles.left}>
            <Image
              style={styles.logo}
              src={require("../../assets/casnos.png")}
            />
          </View>
        </View>
        <View style={styles.reception}>
          <Text style={styles.accuse}>Accuse de reception</Text>
          <Text style={styles.article}>
            Article 13 de la loi n°08-08 du 23 février 2008 relative aux
            recouvrement dans le domaine de la sécurité sociale
          </Text>
        </View>
        {/* hnaa tji les information  */}
        <View style={styles.infosContainer}>
          <View>
            {" "}
            <Text style={styles.text}>
              Nom et prenom: {data?.nom} {data?.prenom}
            </Text>
            <Text style={styles.text}>
              date de naissance: {data?.date_de_naissance}
            </Text>
          </View>

          <Text style={styles.text}>Adresse: {data?.adresse}</Text>

          <Text style={styles.text}>Recours sur: {data?.recours}</Text>

          <Text style={styles.text}>les pieces:{data?.pieces}</Text>
          <Text style={styles.depose}>depose le {date}</Text>
        </View>
        <View style={styles.lawContainer}>
          {data?.commission === "National" ? (
            <Text style={styles.law}>
              Très Important Article 15 de la loi n° 08-08 du 23 février 2008
              relative au contentieux dans le domaine de la sécurité sociale.
              Les décisions rendues par le Comité National susceptibles de
              recours sont susceptibles de recours devant la juridiction
              compétente conformément aux dispositions de la du Code de
              Procédure Civile, dans un délai de trente (30) jours à compter de
              la date de délivrance de la notification de la décision contestée,
              ou dans un délai de soixante (60) jours à compter de la date de
              réception de la requête par la Commission Nationale. Comité
              éligible à un recours préalable, nous n'avons reçu aucune réponse
              à son patient.
            </Text>
          ) : (
            <Text style={styles.law}>
              Très Important Article 15 de la loi n° 08-08 du 23 février 2008
              relative au contentieux dans le domaine de la sécurité sociale.
              Les décisions rendues par le Comité National susceptibles de
              recours sont susceptibles de recours devant la juridiction
              compétente conformément aux dispositions de la du Code de
              Procédure Civile, dans un délai de trente (30) jours à compter de
              la date de délivrance de la notification de la décision contestée,
              ou dans un délai de soixante (60) jours à compter de la date de
              réception de la requête par la Commission Nationale. Comité
              éligible à un recours préalable, nous n'avons reçu aucune réponse
              à son patient.
            </Text>
          )}
        </View>
      </Page>
    </Document>
  );
};

export default AccuserPdf;
