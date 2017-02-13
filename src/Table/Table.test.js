3
/**
 * Created by kare2436 on 2/10/17.
 */
import React from 'react';
import sinon from 'sinon'
import data from '../../public/data.json'
import {shallow, mount} from 'enzyme';
import Table, {TableRow} from './Table';

describe('Table', () => {

    it('renders without crashing', () => {
        shallow(<Table />);
    });

    //TODO find a way to test asynchronsity in react components :facepalm:
    it('should have correct number of table rows', () => {
        const spy = sinon.spy(Table.prototype, 'getData');
        mount(<Table />);
        expect(spy.calledOnce).toEqual(true);
    });


    // TODO get more time than a weekend to crash course a framework where your future depends on it brah
    // Quickly becoming integrated tests as the sort function also needs to be mocked out
    // At least I know that the click handler is being called properly
    // The stack trace shows an undefined error in 'sortData.js'
    // Why? Because of the issue above the 'state' of the component is not ready by the time this
    // synchronous test is run

    // Note to self: Remove 'x' to run
    xit('should call columnHeaderClickHandler when a header is clicked', () => {
        const spy = sinon.spy(Table.prototype, 'columnHeaderClickHandler');
        const table = shallow(<Table/>);

        table.instance().setState(data.slice(0,3));
        //table.instance().forceUpdate();

        table.find('.TableHeader').at(0).simulate('click', {
            preventDefault: ()=>{},
            target: {
                innerHTML: 'Title'
            }
        });

        expect(spy.calledOnce).toEqual(true)
    });

    describe('Table Row', () => {
        const singleData = {
            "userId": 1,
            "id": 1,
            "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
            "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
        };

        it('should render', () => {
            shallow(<TableRow _data={singleData}/>)
        });

        it('should have properties', () => {
            const tableRow = shallow(<TableRow _data={singleData}/>);
            expect(tableRow.instance().props._data.userId).toEqual(1);
            expect(tableRow.instance().props._data.id).toEqual(1);
            expect(tableRow.instance().props._data.title)
                .toEqual("sunt aut facere repellat provident occaecati excepturi optio reprehenderit");

            expect(tableRow.instance().props._data.body)
                .toEqual("quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto")
        });
    })

});
