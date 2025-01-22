export default function Home() {
    return (
        <div className="flex flex-col items-center justify-center w-full h-screen gap-6">
            
			<div
                className="text-8xl sm:text-5xl font-bold text-center"
                style={{
                    background: "linear-gradient(230deg, #e74694, #4b79cf, #4bc5cf, #4b79cf, #e74694)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent"
                }}
            >
                AsyncAPI Conf 2025
            </div>
            <div className="flex sm:flex-col flex-row gap-6 items-center">
                
                <p
                    className="font-bold text-white sm:text-4xl text-7xl shadow-lg"
                    style={{ textShadow: "#9D00FF 1px 0 8px" }}
                >
                    COMING SOON
                </p>
            </div>
        </div>
    )
}

