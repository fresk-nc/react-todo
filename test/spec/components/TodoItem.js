import TodoItem from 'components/TodoItem';
import TodoActions from 'actions/TodoActions';
import TestUtils from 'react-addons-test-utils';
import styles from 'components/TodoItem/TodoItem.styl';

const ESCAPE_KEY = 27;
const ENTER_KEY = 13;

function renderComponent(props) {
    return TestUtils.renderIntoDocument(<TodoItem {...props} />);
}

describe('Component TodoItem', () => {

    beforeEach(function() {
        this.mockProps = {
            id: '1',
            title: 'test',
            isCompleted: false,
            isNew: false
        };

        this.sinon.stub(TodoActions, 'updateItem');
        this.sinon.stub(TodoActions, 'deleteItem');
        this.sinon.stub(TodoActions, 'undoDeleteItem');
    });

    it('should exists', function() {
        const component = renderComponent(this.mockProps);

        expect(TestUtils.isCompositeComponent(component)).to.be.equal(true);
    });

    it('should render the toggler', function() {
        const component = renderComponent(this.mockProps);
        const toggler = TestUtils.scryRenderedDOMComponentsWithClass(component, styles.toggler);

        expect(toggler.length).to.be.equal(1);
        expect(toggler[0].checked).to.be.equal(false);
    });

    it('should render the checked toggler for completed todo', function() {
        const component = renderComponent(Object.assign(this.mockProps, {
            isCompleted: true
        }));
        const toggler = TestUtils.findRenderedDOMComponentWithClass(component, styles.toggler);

        expect(toggler.checked).to.be.equal(true);
    });

    it('should call action of update by clicking on the toggler', function() {
        const component = renderComponent(this.mockProps);
        const toggler = TestUtils.findRenderedDOMComponentWithClass(component, styles.toggler);

        TestUtils.Simulate.change(toggler);

        expect(TodoActions.updateItem).to.have.callCount(1);
        expect(TodoActions.updateItem).to.be.calledWith(this.mockProps.id, {
            isCompleted: true
        });
    });

    it('should render the title, if not edit mode and todo is not new', function() {
        const component = renderComponent(this.mockProps);
        const title = TestUtils.scryRenderedDOMComponentsWithClass(component, styles.title);
        const editField = TestUtils.scryRenderedDOMComponentsWithClass(component, styles.editField);

        expect(title.length).to.be.equal(1);
        expect(editField.length).to.be.equal(0);
        expect(title[0].textContent).to.be.equal('test');
    });

    it('should render the edit field for new todo', function() {
        const component = renderComponent(Object.assign(this.mockProps, {
            isNew: true
        }));
        const title = TestUtils.scryRenderedDOMComponentsWithClass(component, styles.title);
        const editField = TestUtils.scryRenderedDOMComponentsWithClass(component, styles.editField);

        expect(title.length).to.be.equal(0);
        expect(editField.length).to.be.equal(1);
    });

    it('should be able to replace the title to the edit field by clicking on the content', function() {
        const component = renderComponent(this.mockProps);
        let title = TestUtils.scryRenderedDOMComponentsWithClass(component, styles.title);
        let editField = TestUtils.scryRenderedDOMComponentsWithClass(component, styles.editField);

        expect(title.length).to.be.equal(1);
        expect(editField.length).to.be.equal(0);

        TestUtils.Simulate.click(TestUtils.findRenderedDOMComponentWithClass(component, styles.content));
        title = TestUtils.scryRenderedDOMComponentsWithClass(component, styles.title);
        editField = TestUtils.scryRenderedDOMComponentsWithClass(component, styles.editField);

        expect(title.length).to.be.equal(0);
        expect(editField.length).to.be.equal(1);
    });

    it('should render the edit field with todo title, after clicking on the content', function() {
        const component = renderComponent(this.mockProps);

        TestUtils.Simulate.click(TestUtils.findRenderedDOMComponentWithClass(component, styles.content));
        const editField = TestUtils.findRenderedDOMComponentWithClass(component, styles.editField);

        expect(editField.value).to.be.equal(this.mockProps.title);
    });

    it('should be able to replace the edit field to the title by pressing on the escape', function() {
        const component = renderComponent(this.mockProps);

        TestUtils.Simulate.click(TestUtils.findRenderedDOMComponentWithClass(component, styles.content));

        let title = TestUtils.scryRenderedDOMComponentsWithClass(component, styles.title);
        let editField = TestUtils.scryRenderedDOMComponentsWithClass(component, styles.editField);

        expect(title.length).to.be.equal(0);
        expect(editField.length).to.be.equal(1);

        TestUtils.Simulate.keyDown(editField[0], {
            which: ESCAPE_KEY
        });
        title = TestUtils.scryRenderedDOMComponentsWithClass(component, styles.title);
        editField = TestUtils.scryRenderedDOMComponentsWithClass(component, styles.editField);

        expect(title.length).to.be.equal(1);
        expect(editField.length).to.be.equal(0);
    });

    it('should call action of update by pressing on the Enter', function() {
        const component = renderComponent(this.mockProps);

        TestUtils.Simulate.click(TestUtils.findRenderedDOMComponentWithClass(component, styles.content));

        const editField = TestUtils.findRenderedDOMComponentWithClass(component, styles.editField);
        const newTitle = 'new title';
        TestUtils.Simulate.change(editField, {
            target: {
                value: newTitle
            }
        });
        TestUtils.Simulate.keyDown(editField, {
            which: ENTER_KEY
        });

        expect(TodoActions.updateItem).to.have.callCount(1);
        expect(TodoActions.updateItem).to.be.calledWith(this.mockProps.id, {
            title: newTitle,
            isNew: false
        });
    });

    it('should call action of update by blurring the edit field', function() {
        const component = renderComponent(this.mockProps);

        TestUtils.Simulate.click(TestUtils.findRenderedDOMComponentWithClass(component, styles.content));

        const editField = TestUtils.findRenderedDOMComponentWithClass(component, styles.editField);
        const newTitle = 'new title';
        TestUtils.Simulate.change(editField, {
            target: {
                value: newTitle
            }
        });
        TestUtils.Simulate.blur(editField);

        expect(TodoActions.updateItem).to.have.callCount(1);
        expect(TodoActions.updateItem).to.be.calledWith(this.mockProps.id, {
            title: newTitle,
            isNew: false
        });
    });

    it('should render the delete button', function() {
        const component = renderComponent(this.mockProps);
        const deleteButton = TestUtils.scryRenderedDOMComponentsWithClass(component, styles.delete);

        expect(deleteButton.length).to.be.equal(1);
    });

    it('should call action of delete by clicking on the delete button', function() {
        const component = renderComponent(this.mockProps);

        TestUtils.Simulate.click(TestUtils.findRenderedDOMComponentWithClass(component, styles.delete));

        expect(TodoActions.deleteItem).to.have.callCount(1);
        expect(TodoActions.deleteItem).to.be.calledWith(this.mockProps.id);
    });

    it('should render the undo-delete button', function() {
        const component = renderComponent(this.mockProps);
        const undoDeleteButton = TestUtils.scryRenderedDOMComponentsWithClass(component, styles.undo);

        expect(undoDeleteButton.length).to.be.equal(1);
    });

    it('should call action of undo-delete by clicking on the undo button', function() {
        const component = renderComponent(this.mockProps);

        TestUtils.Simulate.click(TestUtils.findRenderedDOMComponentWithClass(component, styles.undo));

        expect(TodoActions.undoDeleteItem).to.have.callCount(1);
        expect(TodoActions.undoDeleteItem).to.be.calledWith(this.mockProps.id);
    });

});
