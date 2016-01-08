import ComponentHeader from 'components/Header'

export default React.createClass({
    displayName: 'App',

    render: function () {
        return (
            <div className="app">
                <ComponentHeader />
            </div>
        );
    }
});
