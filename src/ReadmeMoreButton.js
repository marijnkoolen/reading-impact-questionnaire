
"use strict"

import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import FormActions from './formActions.js';

class ReadmeMoreButton extends Component {

    constructor(props) {
        super(props);
    }

    changeView() {
        // TO DO: implement readme-more page
        //FormActions.changeView("readme-more");
    }

    render() {
        return (
            <button
                className="btn btn-primary"
                onClick={this.changeView.bind(this)}
            >
				<div>
					<p>
						Op deze pagina geven we een nadere toelichting op onze vragenlijst. Het gaat om een onderzoek opgezet door 
						Peter Boot (<a href="https://www.huygens.knaw.nl/">Huygens ING</a>) en Marijn Koolen (<a href="https://huc.knaw.nl/about/">KNAW
						Humanities Cluster</a>). De vraag die we willen onderzoeken is: wat is de impact van fictie op lezers?  
					</p>
					<p>
						Wij zijn niet de eersten die deze vraag onderzoeken. Onze bijdrage is dat we de vraag willen onderzoeken aan de hand van 
						online recensies zoals lezers die bijvoorbeeld op Hebban kunnen plaatsen. De meeste andere onderzoekers maken gebruik van 
						experimenten: ze vragen lezers (vaak eerstejaars psychologiestudenten) een verhaal te lezen en laten die lezers dan 
						een aantal vragenlijsten invullen. Dat is een mooie manier van onderzoek, want alle proefpersonen lezen hetzelfde en je 
						kunt ze alles vragen wat je wilt. Het nadeel is dat het nogal bewerkelijk is, dat de situatie niet erg natuurlijk is en 
						dat mensen niet het boek lezen waar ze zelf voor kiezen. We denken dus dat er goede redenen zijn om leesonderzoek te doen 
						aan de hand van reviews die een gevarieerde groep lezers (qua leeftijd en achtergrond) spontaan schrijven over de boeken 
						waar ze zelf enthousiast over zijn. 
					</p>
					<p>
						Een belangrijke reden waarom we hebben gekozen voor de impactaspecten die we centraal stellen (emotie, narratief gevoel, 
						gevoel voor stijl, reflectie) is dat we willen aansluiten bij bestaand onderzoek. Dit zijn de aspecten waarop veel 
						recent leesonderzoek zich concentreert. Van sommige van die aspecten is ook vaak gedacht dat ze er toe zouden kunnen bijdragen 
						dat lezers een beetje sociale mensen zijn: als je kunt meevoelen met een personage in een verhaal dan kun je dat waarschijnlijk 
						ook met echte mensen, en als je door een verhaal aan het denken gezet kunt worden heb je een beter idee van hoe 
						de wereld in elkaar zit. Dat is de theorie. (Maar daar richten we ons niet speciaal op). 
					</p>
					<p>
						We willen dus kijken naar de impact van fictie op deze vier aspecten. Maar het zou niet erg spannend zijn om alleen maar 
						te kijken naar fictie in zijn algemeenheid. Het wordt pas interessant als we verschillende boeken of verschillende genres 
						kunnen vergelijken. Of als je kunt kijken naar de invloed van bepaalde aspecten van romans (e.g. schrijfstijl, plot, 
						karakters, sfeer) op de verschillende vormen van impact. 
						Met de tienduizenden reviews op sites als Hebban zou dat ook mogelijk moeten zijn. Maar dat lukt niet 
						meer zonder een gecomputeriseerde analyse. Wat wij ontwikkelen is een computerprogramma dat aan de hand van de tekst 
						van een review automatisch bepaalt of er sprake is van emotionele impact, van narratief gevoel, van impact van de stijl en 
						van reflectie. 
					</p>
					<p>
						Daarvoor kijken we naar het voorkomen van bepaalde woorden en woordcombinaties. De woorden <em>mooi</em> 
						en <em>humor</em> wijzen waarschijnlijk meestal op stilistische impact, het woord <em>spannend</em> op narratief gevoel, het
						woord <em>thema</em> op reflectie en het woord <em>ontzettend</em> op emotionele impact, al weten we niet waarvan. 
						In andere gevallen zijn combinaties van woorden nodig om te besluiten dat een bepaalde vorm van impact aanwezig is. 
						In totaal hebben we 350 regels die op basis van woordgebruik bepaalde vormen van impact afleiden. Overigens zijn veel van 
						die woorden ontleend aan eerder onderzoek. 
					</p>
					<p>
						We kunnen de computer deze regels eenvoudig laten toepassen. Maar dan gaan we ervan uit dat die regels kloppen. 
						Maar is dat zo? <em>Wij</em> kunnen denken dat humor een kwestie is van stijl, of dat gebruik van het woord <em>bizar</em> 
						betekent dat de lezer/reviewer aan het denken is gezet. Maar we willen graag toetsen of dat klopt met hoe mensen ernaar kijken 
						die elke dag reviews lezen en schrijven. Vandaar dat we voor een beperkt aantal zinnen uit de reviews willen vergelijken 
						welke impactaspecten de computer ziet en welke impactaspecten de Hebban-bezoeker onderkent. Dat is het doel van deze enqête. Kloppen  
						uw antwoorden met die van de computer dan hebben wij het goed gedaan en kunnen we verder met de analyse van de reviews. 
						Als u iets anders zegt dan de computer dan hebben we het fout gedaan en moeten we kijken hoe we onze regels kunnen aanpassen. 
					</p>
					<p>
						Als u verdere vragen heeft, of als u op de hoogte wilt blijven van de vorderingen van het onderzoek, neem dan contact 
						op met <a href="mailto:peter.boot@huygens.knaw.nl">peter.boot@huygens.knaw.nl</a> en/of 
						<a href="mailto:marijn.koolen@di.huc.knaw.nl">marijn.koolen@di.huc.knaw.nl</a>.
					</p>
				
				</div>
				
            </button>
        )
    }
}

export default ReadmeMoreButton;


