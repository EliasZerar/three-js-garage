import { useEffect, useState } from "react";
import "./startOverlay.css";

interface StartOverlayProps {
    onStart: () => void;
}

export function StartOverlay({ onStart }: StartOverlayProps) {
    // visible contrôle si le composant est monté dans le DOM
    // fadeOut déclenche l'animation CSS de disparition avant de démonter
    // je separe les deux pour laisser le temps à l'animation de se jouer (600ms)
    const [visible, setVisible] = useState(true);
    const [fadeOut, setFadeOut] = useState(false);

    const handleStart = () => {
        // je lance d'abord le fondu, puis je retire le composant du DOM après 600ms
        // si je retirai directement visible à false, l'animation n'aurait pas le temps de se jouer
        setFadeOut(true);
        setTimeout(() => {
            setVisible(false);
            onStart();
        }, 600);
    };

    useEffect(() => {
        // je permet aussi de démarrer avec Espace ou Entrée en plus du clic sur le bouton
        // je retourne une fonction de cleanup pour retirer le listener quand le composant se démonte
        // sinon le listener resterait actif en mémoire même après la disparition de l'overlay
        const handleKey = (e: KeyboardEvent) => {
            if (e.code === "Space" || e.code === "Enter") handleStart();
        };
        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, []);

    // si visible est false on ne rend rien du tout, le composant est retiré du DOM
    if (!visible) return null;

    return (
        // j'ajoute la classe fade-out dynamiquement pour déclencher la transition CSS
        <div className={`overlay ${fadeOut ? "fade-out" : ""}`}>
            <div className="overlay-card">
                <p className="overlay-lore">
                    Tu te réveilles dans un garage sombre.<br />
                    L'odeur d'huile et de béton froid te rappelle où tu es.<br />
                    <span className="overlay-lore-sub">Quelque chose t'attend ici...</span>
                </p>

                <div className="overlay-divider" />

                <div className="overlay-controls">
                    <div className="key-row">
                        <kbd>Z</kbd>
                    </div>
                    <div className="key-row">
                        <kbd>Q</kbd><kbd>S</kbd><kbd>D</kbd>
                    </div>
                    <p className="overlay-controls-label">Se déplacer</p>
                    <p className="overlay-mouse">🖱️ Souris pour regarder</p>
                </div>

                <button className="overlay-btn" onClick={handleStart}>
                    Entrer dans le garage
                </button>

                <p className="overlay-hint">ou appuie sur <kbd>Espace</kbd></p>
            </div>
        </div>
    );
}
