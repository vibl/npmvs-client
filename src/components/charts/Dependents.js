import React from 'react';
import BasicCard from "../card/BasicCard";
import fn from '../../logic/field-fns';
import {connectStatePure} from "../../logic/utils";

const description = `
Modules that depend on this one.

Bear in mind that any existing module is counted here, included unused and dead modules.
`;
export const config = {
  label: 'Dependent modules',
  description,
};

const Dependents = ({data}) => ! data ? null : <BasicCard {...{config, data}} />;

const selectorFn = ({dependentsCount}) => dependentsCount;

export default connectStatePure(Dependents, selectorFn);
