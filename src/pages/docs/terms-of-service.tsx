import { useNavigate, useParams } from "react-router-dom";

export default function TermsOfService() {
    const { language } = useParams();
    const navigate = useNavigate();

    return (
        <div>
            <select value={language} onChange={(e) => navigate(`/docs/terms-of-service/${e.target.value}`)}>
                <option value="pl">Polski</option>
                <option value="en">English</option>
            </select>
            {(() => {
                switch (language) {
                    case "pl":
                        return <p>Regulamin</p>;
                    case "en":
                        return <p>Terms of Service</p>;
                    default:
                        return <p>Language not found</p>;
                }
            })()}
        </div>
    );
}