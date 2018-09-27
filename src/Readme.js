
"use strict"

import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import LoginButton from './LoginButton.js';
import ReadmeMoreButton from './ReadmeMoreButton.js';
import QuestionnaireButton from './QuestionnaireButton.js';
import FormActions from './formActions.js';

class Readme extends Component {


    constructor(props) {
        super(props);
    }

    changeView(event) {
        let action = event.target.name;
        if (action === "readme-more") {
            this.props.changeView("readme-more");
       }
    }

    render() {
        let annotator = FormActions.getAnnotator();
        let nextButton = (annotator) ?
            (<QuestionnaireButton labelText="Terug naar de vragenlijst"/>) :
            (<LoginButton labelText="Ik doe graag mee!"/>);
        return (
            <div className="readme">
                <div className="readme-header">
                    <h1>Beoordelen van Impact van Lezen in Boekrecensies</h1>
                </div>
                <div className="readme-background">
                    <p>
                        Vragenlijst opgesteld door Peter Boot (Huygens ING) en Marijn Koolen (KNAW
                        Humanities Cluster) in het kader van een onderzoek over hoe lezers de impact
                        van een boek uitdrukken. Als u meer wilt weten over dit onderzoek en hoe de
                        gegevens gebruikt worden, kunt u contact opnemen via ... (email/blog/...).
                    </p>
                    <p>
                        Deze vragenlijst is opgesteld om te begrijpen hoe lezers de impact van een boek
                        uitdrukken in online boekrecensies. Je krijgt een aantal zinnen uit boekrecensies
                        te zien en we vragen je te beoordelen of deze zinnen leesimpact uitdrukken en zo
                        ja, wat voor soort impact. De gegevens die we met deze vragenlijst verzamelen,
                        worden alleen voor academisch onderzoek gebruikt.
                    </p>
                    <p>
                        We gebruiken deze gegevens om een model te ontwikkelen en testen waarmee we
                        verschillende cognitieve, taalkundige en literaire aspecten van de impact van
                        het lezen van fictie willen bestuderen.
                    </p>
                    <p>
                        Vragen die we willen onderzoeken zijn o.a.:
                    </p>
                    <ul>
                        <li>
                            Wat voor soorten en vormen van leesimpact noemen fictielezers in hun
                            recensies? (cognitief aspect)
                        </li>
                        <li>
                            Hoe worden die soorten en vormen van impact door fictielezers uitgedrukt?
                            (linguistiek aspect)
                        </li>
                        <li>
                            Hoe verhouden verschillende fictiegenres zich tot verschillende soorten
                            van leesimpact (literair aspect)
                        </li>
                        <li>
                            Welke aspecten van een roman (e.g. schrijfstijl, plot, karakters, sfeer)
                            leiden tot welke soorten leesimpact (literair aspect)
                        </li>
                    </ul>
                    <p>
                        Soorten impact:
                    </p>
                    <ul>
                        <li>
                            Emotie: bij emotie gaat het om elke vorm van emotionele impact: ontroering,
                            spanning, afschuw, bewondering, ergernis, verveling, enzovoort
                        </li>
                        <li>
                            narratieve gevoelens: Bij narratieve gevoelens gaat het om gevoelens voor
                            de karakters of de wereld waarin het verhaal zich afspeelt: medelijden,
                            bewondering, identificatie, sympathie, absorptie (opgenomen zijn in de
                            verhaalwereld), meegesleurd zijn in het verhaal, maar ook afkeer of
                            ergernis over een personage of over de wereld van het verhaal
                        </li>
                        <li>
                            gevoelens over de stijl: Bij gevoelens over de stijl gaat het om de vraag
                            of de stijl aantrekkelijk is (mooi, goed, maar ook lelijk) en of het
                            opvallend is  (origineel, verrassend, treffend)
                        </li>
                        <li>
                            reflectie: Bij reflectie gaat het om de vraag: heeft de tekst de reviewer
                            aan het denken gezet over zichzelf of over de wereld. Heeft de reviewer
                            iets geleerd over de wereld of over zichzelf, heeft hij/zij gepauzeerd om
                            na te denken, wil hij iets onthouden?
                        </li>
                    </ul>
                    <p>
                        We tonen eerst een aantal voorbeeldzinnen uit recensies en beschrijven of en hoe
                        ze een vorm van leesimpact uitdrukken, om aan te geven wat we onder leesimpact
                        verstaan.
                    </p>
                </div>
                <div className="readme-examples">
                    <div className="readme-example">
                        <div className="sentence">
                            <label>Voorbeeldzin 1</label>
                            <span className="sentence-text">
                                "Anna en haar jongere broer Astor zijn samen overgebleven nadat een virus alle volwassenen gedood heeft."
                            </span>
                        </div>
                        <div className="readme-explanation">
                            Bovenstaande zijn bevat een plotbeschrijving, geen leesimpact. Uitleg: Het is een neutrale weergave van de gebeurtenissen in het verhaal
                        </div>
                    </div>
                    <div className="readme-example">
                        <div className="sentence">
                            <label>Voorbeeldzin 2</label>
                            <span className="sentence-text">
                                "Gelukkig heeft Anna het boek van belangrijke dingen waarin haar mama allerlei overlevingstips opschreef voor ze stierf."
                            </span>
                        </div>
                        <div className="readme-explanation">
                            Bovenstaande zin beschrijft plot-interne impact op een karakter, maar geeft ook leesimpact aan. Uitleg: Het woord gelukkig gaat waarschijnlijk ook over de reviewer. Er is sprake van emotionele impact en narratief gevoel. Dit gevoel is positief.
                        </div>
                    </div>
                    <div className="readme-example">
                        <div className="sentence">
                            <label>Voorbeeldzin 3</label>
                            <span className="sentence-text">
                                "Ammaniti beschrijft deze dystopische wereld rauw en afgrijselijk maar ook met een lach en een traan."
                            </span>
                        </div>
                        <div className="readme-explanation">
                            <p>
                                Bovenstaande zin bevat een expressie van impact van lezen m.b.t. emotie, narratief gevoel en misschien gevoel over stijl. Uitleg: dat de wereld dystopisch (tegendeel van utopisch) is, is een gevoel over de verhaalwereld, dus een narratief gevoel. Het woord beschrijft is een hint voor een opmerking over stijl: met een lach en een traan gaat over de manier van vertellen. De woorden rauw, afgrijselijk, lach en traan zijn duidelijke aanwijzingen voor algemene emotionele impact. …
                            </p>
                            <p>
                                De vraag of deze impact positief of negatief is, is niet zo makkelijk te beantwoorden: de wereld wordt beschreven als afgrijselijk, maar het lezen over een afgrijselijke wereld is niet altijd negatief.
                            </p>
                        </div>
                    </div>
                    <div className="readme-example">
                        <div className="sentence">
                            <label>Voorbeeldzin 4</label>
                            <span className="sentence-text">
                                "Niccolo gebruikt regelmatig humor en mooie zinnen om de reis te beschrijven ."
                            </span>
                        </div>
                        <div className="readme-explanation">
                            Bovenstaande zin drukt een gevoel over stijl uit (mooie zinnen, beschrijven). Dit gevoel is positief.
                        </div>
                    </div>
                    <div className="readme-example">
                        <div className="sentence">
                            <label>Voorbeeldzin 5</label>
                            <span className="sentence-text">
                                "Net deze vlotte,wonderlijke stijl van vertellen maakt het voor mij een boek waarbij dystopie als thema aanwezig is maar waar hoop, fantasie en liefde ervoor zorgen dat je blijft lezen."
                            </span>
                        </div>
                        <div className="readme-explanation">
                            Bovenstaande zin drukt positieve gevoelens over stijl uit (vlotte, wonderlijke stijl) en bovendien, in lichte mate, reflectie..  Het gebruik van het woord thema suggereert enige reflectie.
                        </div>
                    </div>
                    <div className="readme-example">
                        <div className="sentence">
                            <label>Voorbeeldzin 6</label>
                            <span className="sentence-text">
                                'Een impressie van de schrijfstijl: " Ze had het gevoel dat haar hart in haar borst uitdroogde als een bloem in een oven, terwijl het bloed dat haar aderen vulde gereduceerd werd tot stof".'
                            </span>
                        </div>
                        <div className="readme-explanation">
                            In bovenstaande zin geeft de lezer een quote uit het boek om schrijfstijl te illustreren. Hieruit blijkt enige aandacht voor de stijl, maar geen sterk gevoel. Of de stijl als prettig of onprettig wordt ervaren kunnen we niet weten. De geciteerde zin bevat wel emoties, maar geen emoties van de reviewer, dus deze emoties zijn voor ons irrelevant.
                        </div>
                    </div>
                    <div className="readme-example">
                        <div className="sentence">
                            <label>Voorbeeldzin 7</label>
                            <span className="sentence-text">
                                "Je wil weten of Anna en Astor een veilige wereld bereiken en hun wens waarheid wordt... Anna las als een roman door de schrijfstijl en als scifi omdat het verhaal zich in de toekomst afspeelt ."
                            </span>
                        </div>
                        <div className="readme-explanation">
                            Bovenstaaande zin duidt op nieuwsgierigheid van de lezer naar een plotontwikkeling. Dit drukt positief narratief gevoel uit. Er is ook sprake van (enige) aandacht voor de stijl, in positieve zin.
                        </div>
                    </div>
               </div>
                <div className="closing">
                    {nextButton}
                    {' '}
                    <ReadmeMoreButton/>
                </div>
            </div>
        );
    }
}

export default Readme;


