
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
						gegevens gebruikt worden, kunt u contact opnemen via email (<a href="mailto:peter.boot@huygens.knaw.nl">peter.boot@huygens.knaw.nl</a> en/of <a href="mailto:marijn.koolen@di.huc.knaw.nl">marijn.koolen@di.huc.knaw.nl</a>).
					</p>
					<p>
						Deze vragenlijst is opgesteld om te begrijpen hoe lezers de impact van een boek
						uitdrukken in online boekrecensies. Je krijgt een aantal zinnen uit boekrecensies
						te zien en we vragen je te beoordelen of deze zinnen leesimpact uitdrukken en zo
						ja, wat voor soort impact. De gegevens die we met deze vragenlijst verzamelen,
						worden alleen voor academisch onderzoek gebruikt.
					</p>
					<p>
						We gebruiken deze gegevens om verschillende aspecten van de impact van
						het lezen van fictie te bestuderen.
					</p>
					<p>
						Vragen die we willen onderzoeken zijn o.a.:
					</p>
					<ul>
						<li>
							Wat voor soorten en vormen van leesimpact noemen fictielezers in hun
							recensies? 
						</li>
						<li>
							Hoe worden die soorten en vormen van impact door fictielezers uitgedrukt?
						</li>
						<li>
							Hoe verhouden verschillende fictiegenres zich tot verschillende soorten
							van leesimpact 
						</li>
						<li>
							Welke aspecten van een roman (e.g. schrijfstijl, plot, karakters, sfeer)
							leiden tot welke soorten leesimpact 
						</li>
					</ul>
					<p>
						Soorten impact:
					</p>
					<ul>
						<li>
							Emotie: elke (tijdelijke of blijvende) emotionele reactie tijdens of na het lezen, 
							of die nu betrekking heeft op het boek als geheel, de karakters, de auteur, de stijl, 
							aspecten van de wereld die het boek beschrijft, of enig ander aspect. Deze gevoelens 
							mogen positief of negatief zijn, sterk of zwak. Het gaat echter niet om gevoelens zoals 
							verveling, waar het boek kennelijk niet het gewenste effect heeft.
						</li>
						<li>
							Narratieve gevoelens: Bij narratieve gevoelens gaat het om gevoelens voor
							de karakters of de wereld waarin het verhaal zich afspeelt: medelijden,
							bewondering, identificatie, sympathie, absorptie (opgenomen zijn in de
							verhaalwereld), meegesleurd zijn in het verhaal, maar ook afkeer of
							ergernis over een personage of over de wereld van het verhaal.
						</li>
						<li>
							Gevoelens over de stijl: elk gevoel dat betrekking heeft op de aesthetische aspecten van de tekst: 
							of de stijl aantrekkelijk is (mooi, goed, maar ook lelijk) en of het
							opvallend is  (origineel, verrassend, treffend).
						</li>
						<li>
							Reflectie: Bij reflectie gaat het om de vraag: heeft de tekst de reviewer
							aan het denken gezet over zichzelf, de personages, het boek of de wereld? Heeft de reviewer
							iets geleerd of een nieuw inzicht, heeft hij/zij gemijmerd, wil hij iets onthouden?
						</li>
					</ul>
					<p>We vragen om een oordeel op een zeven-puntsschaal. We vragen je om in je oordeel te betrekken hoe 
						sterk het gevoel is <i>en</i> hoe zeker je er van bent. Een sterk gevoel bij de reviewer of een 
						gevoel waarover geen twijfel kan bestaan leidt tot een oordeel meer naar rechts; een zwak gevoel 
						of een gevoel waar je niet zeker van bent leidt tot een oordeel meer naar links.</p>
					<p>
						Bovendien vragen we om te bepalen wat voor gevoel dit geweest is. Het gaat hier om de gevoelens 
						van de reviewer! Een <i>afschuwelijke moord</i> is iets negatiefs, maar kan het beginpunt zijn voor 
						een mooi verhaal. <i>Prettig</i> is wat je aanzet tot lezen, <i>onprettig</i> is waardoor je met 
						lezen wilt stoppen. 
					</p>
					<p>
						We tonen eerst een aantal voorbeeldzinnen uit recensies en beschrijven of en hoe
						ze een vorm van leesimpact uitdrukken, om aan te geven wat we onder de verschillende 
						vormen van leesimpact verstaan.
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
							Bovenstaande zin bevat een plotbeschrijving, geen leesimpact. Uitleg: Het is een neutrale weergave van de gebeurtenissen in het verhaal, er is geen sprake van gevoel of reflectie bij de reviewer. 
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
							Bovenstaande zin beschrijft plot-interne impact op een karakter, maar geeft ook leesimpact aan. Uitleg: Het woord <i>gelukkig</i> gaat waarschijnlijk ook over de reviewer. 
							Er is sprake van emotionele impact en narratief gevoel. Dit gevoel is prettig. Hoe sterk die gevoelens bij de reviewer zijn is een kwestie van inschatting. 
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
								Bovenstaande zin bevat een expressie van impact van lezen m.b.t. emotie, narratief gevoel en 
								misschien gevoel over stijl. Uitleg: dat de wereld dystopisch (tegendeel van utopisch) is, is 
								een gevoel over de verhaalwereld, dus een narratief gevoel. Het woord <i>beschrijft</i> is een hint 
								voor een opmerking over stijl: <i>met een lach en een traan</i> gaat over de manier van vertellen. 
								De woorden <i>rauw</i>, <i>afgrijselijk</i>, <i>lach</i> en <i>traan</i> zijn duidelijke aanwijzingen voor algemene emotionele impact.<br/> 
								Er is echter geen aanwijzing voor reflectie. 
								De vraag of deze impact prettig of onprettig is, is niet zo makkelijk te beantwoorden: 
								de wereld wordt beschreven als afgrijselijk, maar het lezen over een afgrijselijke wereld 
								is niet altijd negatief. Onze inschatting is dat "prettig" hier het juiste oordeel is, maar 
								ook "zowel prettig als onprettig" valt te verdedigen. 
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
							Bovenstaande zin drukt een gevoel over stijl uit (mooie zinnen, beschrijven). Dit gevoel is prettig.
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
							Bovenstaande zin drukt positieve gevoelens over stijl uit (vlotte, wonderlijke stijl). Er is ook sprake van 
							algemene emotonele impact: de woorden <i>hoop, fantasie en liefde</i> worden niet neutraal gebruikt. De gevoelens zijn prettig.   
							Bovendien lijkt er sprake van reflectie (het woord <i>thema</i>). 
						</div>
					</div>
					<div className="readme-example">
						<div className="sentence">
							<label>Voorbeeldzin 6</label>
							<span className="sentence-text">
								Een impressie van de schrijfstijl: " Ze had het gevoel dat haar hart in haar borst uitdroogde als een bloem in een oven, terwijl het bloed dat haar aderen vulde gereduceerd werd tot stof".
							</span>
						</div>
						<div className="readme-explanation">
							In bovenstaande zin geeft de lezer een quote uit het boek om schrijfstijl te illustreren. 
							Hieruit blijkt enige aandacht voor de stijl, maar geen sterk gevoel. Of de stijl als 
							prettig of onprettig wordt ervaren kunnen we niet weten. De geciteerde zin bevat wel emoties, 
							maar geen emoties van de reviewer, dus deze emoties zijn voor ons irrelevant.
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
							Bovenstaaande zin duidt op nieuwsgierigheid van de lezer naar een plotontwikkeling. Dit drukt positief narratief gevoel uit. 
							Er is ook sprake van aandacht voor de stijl, in positieve zin.
						</div>
					</div>
				</div>
                <div className="closing">
                    {nextButton}
                    {' '}
                </div>
            </div>
        );
    }
}

export default Readme;


