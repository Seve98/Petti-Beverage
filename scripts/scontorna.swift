// Scontorna una foto prodotto (bottiglia su fondo nero) e la salva come PNG trasparente.
// Usa lo scontorno soggetto di macOS (Vision, macOS 14+), tutto in locale.
//
// Uso: swift scripts/scontorna.swift <input.(jpg|png|webp)> <output.png>

import AppKit
import CoreImage
import Foundation
import Vision

let argomenti = CommandLine.arguments
guard argomenti.count == 3 else {
    FileHandle.standardError.write("uso: swift scontorna.swift <input> <output.png>\n".data(using: .utf8)!)
    exit(2)
}

let ingresso = URL(fileURLWithPath: argomenti[1])
let uscita = URL(fileURLWithPath: argomenti[2])

guard let immagine = CIImage(contentsOf: ingresso) else {
    FileHandle.standardError.write("impossibile leggere \(ingresso.path)\n".data(using: .utf8)!)
    exit(1)
}

let richiesta = VNGenerateForegroundInstanceMaskRequest()
let gestore = VNImageRequestHandler(ciImage: immagine)
do {
    try gestore.perform([richiesta])
} catch {
    FileHandle.standardError.write("scontorno fallito: \(error)\n".data(using: .utf8)!)
    exit(1)
}

guard let risultato = richiesta.results?.first, !risultato.allInstances.isEmpty else {
    FileHandle.standardError.write("nessun soggetto trovato in \(ingresso.lastPathComponent)\n".data(using: .utf8)!)
    exit(1)
}

// Tutti i soggetti trovati (bottiglia ed eventuale tappo staccato), ritagliati al loro contorno
let buffer = try risultato.generateMaskedImage(
    ofInstances: risultato.allInstances,
    from: gestore,
    croppedToInstancesExtent: true
)

let ritagliata = CIImage(cvPixelBuffer: buffer)
let contesto = CIContext()
guard let spazio = CGColorSpace(name: CGColorSpace.sRGB) else { exit(1) }
do {
    try contesto.writePNGRepresentation(of: ritagliata, to: uscita, format: .RGBA8, colorSpace: spazio)
} catch {
    FileHandle.standardError.write("scrittura fallita: \(error)\n".data(using: .utf8)!)
    exit(1)
}
print("ok \(uscita.lastPathComponent) \(Int(ritagliata.extent.width))x\(Int(ritagliata.extent.height))")
