import '../pages/paper.css';

import {DateCalc} from '../modules/DateCalc';
import {Storage} from '../modules/Storage';
import {Captions} from '../blocks/paper-info/Captions';
import {Gistogram} from '../blocks/analytics/Gistogram';

const dateCalc = () => new DateCalc;
const storage = new Storage;
        
const captions = new Captions(storage.load());
const gistorgam = new Gistogram(dateCalc(), storage.load());

captions.loadingCaptions();
gistorgam.loadingGistogram();



