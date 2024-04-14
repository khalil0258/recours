import React, { useEffect, useState } from 'react'
import logo from "../../assets/casnos.png"
import axios from 'axios';
import { Document, Page, Text, View, StyleSheet, Image, Font } from "@react-pdf/renderer";
import roboto from './../../assets/font_roboto/Roboto-Bold.ttf';

/* import { useSelector } from "react-redux"; */

Font.register({ family: 'Roboto', src: roboto });

// Create styles
const styles = StyleSheet.create({
    page: {
        width: "803px",
        height: "1132px",
      backgroundColor: "white",
      padding: "20px 30px 20px 30px",
      textAlign: "justify",
      position: "relative"
    },
    entete: {
      flexDirection: "column",
      width: "100%",
      justifyContent: "center",
      alignItems: "center",
      fontSize: "12px",
      marginBottom: "-10px",
    },
    entete_titre: {
        marginBottom: "6px",
    },
    entete2: {
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-between",
        alignItems: "center",
        fontSize: "12px",
        marginBottom: "-15px"
    },
      logo: {
        width: "80px",
        height: "80px",
        objectFit: "contain",
    },
      caisse: {
        width: "170px",
        textAlign: "center"
    },
    titre: {
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: "10px",
    },
    titre_texte: {
        width: "120px",
        fontFamily: "Roboto",
        fontSize: "12px",
        textAlign: "center",
        verticalAlign: "center",
        border: "1px solid black",
        padding: "4px 0px 4px 0px"
    },
      reference_decision: {
        fontFamily: "Roboto",
        fontSize: "12px",
        marginBottom: "10px",
    },
    textes_juridiques: {
        fontSize: "10px",
        lineHeight: "1.3",
    },
    texte: {
        marginBottom: "8px",
    },
    textes_juridiques_titre: {
        fontFamily: "Roboto",
        fontSize: "12px",
        textDecoration: "underline",
        marginBottom: "6px"
    },
    infos: {
        fontSize: "11px",
        marginTop: "10px",
        lineHeight: "1.5",
        width: "100%"
    },
    nom: {
        textTransform: "uppercase"
    },
    prenom: {
        textTransform: "capitalize"
    },
    decision: {
        display: "flex",
        flexDirection: "column",
        border: "2px solid black",
        width: "100%",
        fontSize: "12px",
        padding: "8px",
        marginTop: "6px",
        marginBottom: "20px"
    },
    decision_titre: {
        textAlign: "center",
        marginBottom: "5px",
        fontSize: "14px",
        fontFamily: "Roboto"
    },
    texte_form_sujet: {
        marginBottom: "4px",
        textDecoration: "underline",
        fontFamily: "Roboto"
    },
    decision_description: {
        lineHeight: "1.3"
    },
    form_sujet_globale: {
        display: "flex",
        flexDirection: 'row',
        alignItems: "center",
    },
    date_decision: {
        fontSize: "12px",
        marginLeft: "20px"
    },
    important: {
        display: "flex",
        flexDirection: "column",
        border: "2px solid black",
        width: "100%",
        padding: "8px",
        position: "absolute",
        bottom: 20, 
        left: "30"
    },
    important_titre: {
        fontFamily: "Roboto",
        fontSize: "14px",
        marginBottom: "5px",
        textDecoration: "underline"
    },
    important_texte: {
        fontSize: "12px",
        lineHeight: "1.3"
    },
    bold: {
        fontFamily: "Roboto"
    },
    underline: {
        textDecoration: "underline"
    }
  });

function PdfDecision({decision, userinfos}) {

    const [recours, setRecours] = useState('') ;

    //console.log(userinfos)

    useEffect(() => {
        const id = decision.id_recours;
        axios
          .get(`http://localhost:4000/recours/getRecours/${id}`)
          .then((res) => {
            if (res.data.statut === "erreur") {
              //console.log(res);
            } else {
              //console.log(res.data.resultat)
              setRecours(res.data.resultat);
            }
          })
          .catch((err) => {
            //console.log(err)
          });
          // eslint-disable-next-line
      }, []);

      // fonction pour inverser la date et commencer par jour
      function inverserDate(dateString) {
        // Fractionner la chaîne de caractères de la date en parties (année, mois, jour)
        const [annee, mois, jour] = dateString.split('-');
        // Réorganiser les parties pour obtenir le format "dd-mm-yyyy"
        const dateInverse = `${jour}-${mois}-${annee}`;
        return dateInverse;
      }

      /* const user = useSelector((state) => state.auth?.userInfos);
      console.log(user) */

      let infos = "" ;
      if(recours !== ''){
        if(recours.commission.toLowerCase() === "locale"){
            infos = 
                <Text>
                    - En vertu du recours déposé par M./Mme. <Text style={styles.bold}><Text style={styles.nom}>{userinfos.nom}</Text> <Text style={styles.prenom}>{userinfos.prenom}</Text></Text> affilié à la sécurité sociale sous le numéro <Text style={styles.bold}>{userinfos.numero_ss}</Text>, en date du <Text style={styles.bold}>{inverserDate(recours.date.substring(0, 10))}</Text> et concernant : <Text style={styles.bold}>{recours.objet}</Text>.
                </Text>
            
        }else{
            if(recours.motif.toLowerCase() === "contester la décision de la commission locale")
                infos = 
                    <Text>
                        - En vertu du recours déposé par M./Mme. <Text style={styles.bold}><Text style={styles.nom}>{userinfos.nom}</Text> <Text style={styles.prenom}>{userinfos.prenom}</Text></Text> affilié à la sécurité sociale sous le numéro <Text style={styles.bold}>{userinfos.numero_ss}</Text>, en date du <Text style={styles.bold}>{inverserDate(recours.date.substring(0, 10))}</Text> et concernant : <Text style={styles.bold}>{recours.objet}</Text>.
                    </Text>
            else if(recours.motif.toLowerCase() === "montant de pr/mr supérieur à 1 000 000 da")
                infos = 
                    <Text>
                        - En vertu du recours déposé par M./Mme. <Text style={styles.bold}><Text style={styles.nom}>{userinfos.nom}</Text> <Text style={styles.prenom}>{userinfos.prenom}</Text></Text> affilié à la sécurité sociale sous le numéro <Text style={styles.bold}>{userinfos.numero_ss}</Text>, en date du <Text style={styles.bold}>{inverserDate(recours.date.substring(0, 10))}</Text>, concernant : <Text style={styles.bold}>{recours.objet}</Text> et dont le montant dépasse 1 000 000 DA.
                    </Text>
            else 
                infos =
                    <Text>
                        - En vertu du recours déposé par M./Mme. <Text style={styles.bold}><Text style={styles.nom}>{userinfos.nom}</Text> <Text style={styles.prenom}>{userinfos.prenom}</Text></Text> affilié à la sécurité sociale sous le numéro <Text style={styles.bold}>{userinfos.numero_ss}</Text>, en date du <Text style={styles.bold}>{inverserDate(recours.date.substring(0, 10))}</Text>, concernant : <Text style={styles.bold}>{recours.objet}</Text> et dont la commission locale n'a pas répondu dans un délai de 60 jours à compter de la date de soummission du recours.
                    </Text>
          }
      }
      

  return (
    <Document>
        <Page size="A4" style={styles.page}>

            <View style={styles.entete}>
                <Text style={styles.entete_titre}>
                    La République Algérienne Démocratique et Populaire
                </Text>
                <Text>
                    Ministère du Travail, de l'Emploi et de la Sécurité Sociale
                </Text>
            </View>

            <View style={styles.entete2}>
                <Image
                    style={styles.logo}
                    src={logo}
                />
                <Text style={styles.caisse}>
                    Caisse Nationale de Sécurité Sociale des Non-salariés
                </Text>
            </View>

            <View style={styles.titre}>
                <Text style={styles.titre_texte}> Décision </Text>
            </View>

            <View>
                <Text style={styles.reference_decision}>
                    <Text style={styles.underline}>Décision N° :</Text>    {decision.id_decision}
                </Text>
            </View>

            <View style={styles.textes_juridiques}>
                <Text style={styles.textes_juridiques_titre}>
                    Textes juridiques :
                </Text>
                <Text style={styles.texte}>
                    1 - Loi n° 08-08 du 16 Safar 1429 correspondant au 23 février 2008, relative aux contentieux dans le domaine de la sécurité sociale.
                </Text>
                <Text style={styles.texte}>
                    2 - En vertu du décret exécutif numéro 15-289 daté du 02 Safar 1437 correspondant au 14 novembre 2015, relatif à la sécurité sociale des travailleurs Non-Salariés exerçant une activité pour leur propre compte.
                </Text>
                <Text style={styles.texte}>
                    3 - En vertu de la loi numéro 83-14 en date du 02 juillet 1983 relative aux obligations des assujettis dans le domaine de la sécurité sociale.
                </Text>

                { (recours && recours.commission.toLowerCase()) === "locale" ? 
                    (
                        <>
                            <Text style={styles.texte}>
                                4 - En vertu du décret exécutif numéro 08-415 en date du 26 Dhou al-Hijja 1429 correspondant au 24 décembre 2008, qui détermine le nombre de membres des commissions locales de recours préalable qualifiées dans le domaine de la sécurité sociale.
                            </Text>
                            <Text style={styles.texte}>
                                5 - En vertu de la décision numéro 07/282 en date du 19 novembre 2015, portant nomination des membres de la commission locale de recours préalable qualifiée dans le domaine de la sécurité sociale.
                            </Text>
                        </>
                    ) : 
                    (
                        <>
                            <Text style={styles.texte}>
                                4 - En vertu du décret exécutif n°08-416 daté du 26 Dhou al-Hijja 1429 correspondant au 24 décembre 2008, qui détermine le nombre de membres des commissions nationales de recours préalable qualifiées dans le domaine de la sécurité sociale, notamment ses articles 2 et 3.
                            </Text>
                            <Text style={styles.texte}>
                                5 - Conformément à la décision ministérielle numéro 53 en date du 8 avril 2021, portant nomination des membres de la commission nationale de recours préalable qualifiée au sein de la Caisse nationale de sécurité sociale des non-salariés.
                            </Text>
                        </>
                    )
                }

            </View>

            <View style={styles.infos}>
                
                {infos}
                
                <Text style={styles.infos}>
                    - À la suite des délibérations lors de la réunion tenue le :  <Text style={styles.bold}>{inverserDate(decision.date_reunion.substring(0, 10))}</Text>, session numéro :  <Text style={styles.bold}>{decision.id_reunion}</Text>, la commission a décidé:
                </Text>
            </View>

            <View style={styles.decision}>
                <Text style={styles.decision_titre}>
                    --- Décision ---
                </Text>
                <View style={styles.form_sujet_globale}>
                    <Text style={styles.texte_form_sujet}>Dans la forme :</Text>
                    <Text>   Recours {decision.decision_forme} </Text>
                </View>
                
                { /* (decision.decision_sujet.toLowerCase() === "accepté" || decision.decision_sujet.toLowerCase() === "rejeté") */ decision.decision_sujet !== null && 

                    <View style={styles.form_sujet_globale}>
                        <Text style={styles.texte_form_sujet}>Dans le sujet :</Text>
                        <Text>   Recours {decision.decision_sujet} </Text>
                    </View>
                }

                <Text style={styles.decision_description}>
                    {decision.description}
                </Text>
            </View>

            <View style={styles.date_decision}>
                <Text>
                    <Text style={styles.bold}> Rédigé le : </Text>  {inverserDate(decision.date_decision.substring(0, 10))}
                </Text>
            </View>

            <View style={styles.important}>
                <Text style={styles.important_titre}>
                    Important :
                </Text>
                <Text style={styles.important_texte}>
                    { (recours && recours.commission.toLowerCase() === "locale") ?
                        "En cas de contestation de cette décision, vous avez la possibilité de faire un recours devant la commission nationale dans un délai de quinze (15) jours à compter de la réception de cette décision, conformément aux dispositions de l'article 8 de la loi 08/08 en date du 23 février 2008 relative aux contentieux de la sécurité sociale."

                        :
                        "En cas de désaccord avec cette décision, vous avez la possibilité de contester devant le tribunal compétent dans un délai de trente (30) jours à compter de la réception de la notification de la décision, conformément aux dispositions de l'article 15 de la loi numéro 08-08 du 23 février 2008 relative aux contentieux dans le domaine de la sécurité sociale."
                    }
                </Text>
            </View>

        </Page>
    </Document>
  )
}

export default PdfDecision
