const Error = (props) => {
    if (!props.visible) return null;
    return(<section className="sect min-vh-100 d-flex align-items-center justify-content-center py-3">
        <div className="container">
            <div className="row justify-content-center align-items-center">
                <h3 className="text-center mt-3">Error</h3>
                <p className="text-center mt-3">Sorry but an error has occured. Please try refressing the page.</p>
            </div>
        </div>
    </section>);
}

export default Error;
