
"use strict"

import React, {Component} from 'react';
import ReactDOM from 'react-dom';

class ReadmeExamples extends Component {

    render() {
        return (
            <div className="readme-examples">
                <div className="readme-header">
                    <h3>Impact voorbeeldenzinnen</h3>
                </div>
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
                        Bovenstaande zin duidt op nieuwsgierigheid van de lezer naar een plotontwikkeling. Dit drukt positief narratief gevoel uit.
                        Er is ook sprake van aandacht voor de stijl, in positieve zin.
                    </div>
                </div>
                <div className="closing">
                    <p>Dit is het einde van de uitleg. Klik bovenaan de pagina op <em>Naar de vragenlijst</em> om zelf zinnen te beoordelen. We danken je nogmaals voor je interesse en bijdrage! We zijn blij met elke vraag die je beantwoordt, en beseffen dat je oordeel kan afwijken van die van anderen. Er zijn geen foute oordelen.</p>
                </div>
            </div>

        );
    }
}

export default ReadmeExamples;



