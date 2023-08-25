// eslint-disable-next-line react/prop-types
function WelcomeUser({ rol, user }) {
    return (
        <>
            <h1 className="text-White text-center text-5xl mx-20">
                Bienvenido {rol} Sr. {user}
            </h1>
        </>
    )
}

export default WelcomeUser;
