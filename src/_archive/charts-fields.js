import {filter, keys} from "ramda";
import fields from "../data/data-fields";

export const chartsFields = filter( o => o.component && o.component.endsWith('Chart'), fields);

export const chartsList = keys(chartsFields);
