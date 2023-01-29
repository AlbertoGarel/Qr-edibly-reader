import React from 'react';
import renderer, { act } from "react-test-renderer";
import App from "../src/App";
import {render} from './test-utils'
// test('renders App.tsx correctly', ()=>{
//     const tree = renderer.create(<App/>).toJSON();
//     expect(tree).toMatchSnapshot();
// })

it("renders correctly", async () => {
    await act(async () => {
        renderer.create(<App />);
    });
});