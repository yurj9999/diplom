import '../pages/paper.css';

import {DateCalc} from '../modules/DateCalc';
import {Storage} from '../modules/Storage';
import {Captions} from '../modules/AnalyticsModules/Captions';
import {Gistogram} from '../modules/AnalyticsModules/Gistogram';

const dateCalc = () => new DateCalc;
const storage = new Storage;
        
const captions = new Captions(dateCalc(), storage.load());
const gistorgam = new Gistogram(dateCalc(), storage.load());

captions.loadingCaptions();
gistorgam.loadingGistogram();



