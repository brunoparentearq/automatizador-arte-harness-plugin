// index.js - Ponto de entrada do plugin
const path = require('path');
const { exec } = require('child_process');

class AutomatizadorArtePlugin {
    constructor(config) {
        this.config = config;
        // Ajuste o caminho para apontar para a pasta src do seu projeto principal
        // Supondo que harness-plugin está dentro de Automatizador_Arte
        this.projectRoot = path.join(__dirname, '..'); 
        this.pythonPath = config.python_path || path.join(this.projectRoot, '.venv', 'Scripts', 'python.exe');
        this.apiKey = config.deepseek_api_key;
    }

    async analyzeImage(imagePath) {
        const apiScript = path.join(this.projectRoot, 'src', 'art_pipeline', 'api.py');
        // Comando Python ajustado para funcionar de qualquer lugar
        const command = `${this.pythonPath} -c "import sys; sys.path.insert(0, r'${path.join(this.projectRoot, 'src')}'); from art_pipeline.api import analyze_image; import json; print(json.dumps(analyze_image(r'${imagePath}')))"`;
        
        return new Promise((resolve, reject) => {
            exec(command, { cwd: this.projectRoot }, (error, stdout, stderr) => {
                if (error) {
                    console.error('Erro ao executar Python:', error);
                    reject(error);
                } else {
                    try {
                        resolve(JSON.parse(stdout));
                    } catch (e) {
                        reject(new Error('Falha ao parsear resposta JSON do Python: ' + stdout));
                    }
                }
            });
        });
    }

    async consultAI(reportData) {
        // Placeholder para Etapa D
        return `## 🔍 Diagnóstico Resumido\nLaudo recebido. Blockiness: ${reportData.quality?.jpeg_blockiness?.blockiness || 'N/A'}.\n\n## 🛠️ Plano de Ação\nImplementação da API DeepSeek pendente (Etapa D).`;
    }
}

// Exportação padrão esperada pelo Harness
module.exports = AutomatizadorArtePlugin;