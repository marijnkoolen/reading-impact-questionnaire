
"use strict"

import React, {Component} from 'react';
import ReactDOM from 'react-dom';

class ReadmeGeneral extends Component {

    render() {
        return (
            <div className="readme-background">
                <p>
                    Vragenlijst opgesteld door Peter Boot (<a href="https://www.huygens.knaw.nl/">Huygens ING</a>) en Marijn Koolen (<a href="https://huc.knaw.nl/about/">KNAW
                    Humanities Cluster</a>) in het kader van een onderzoek over hoe lezers de impact
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
            </div>
        );
    }
}

export default ReadmeGeneral;


