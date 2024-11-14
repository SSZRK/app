import { useNavigate, useParams } from "react-router-dom";

export default function PrivacyPolicy() {
    const { language } = useParams();
    const navigate = useNavigate();

    return (
        <div>
            <select value={language} onChange={(e) => navigate(`/docs/privacy-policy/${e.target.value}`)}>
                <option value="pl">Polski</option>
                <option value="en">English</option>
            </select>
            {(() => {
                switch (language) {
                    case "pl":
                        return <p>Polityka Prywatności</p>;
                    case "en":
                        return <p>Privacy Policy</p>;
                    default:
                        return <p>Language not found</p>;
                }
            })()}
        </div>
    );
}