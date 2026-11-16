# 🎮 Anime Gamer Vault

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-24.x-green.svg" alt="Node.js Version">
  <img src="https://img.shields.io/badge/Platform-Azure%20App%20Service-blue.svg" alt="Azure Platform">
  <img src="https://img.shields.io/badge/Database-Azure%20SQL-orange.svg" alt="Azure SQL">
  <img src="https://img.shields.io/badge/Status-Online-success.svg" alt="Status">
</p>

**Anime Gamer Vault** es una aplicación web desarrollada para entusiastas del anime y los videojuegos, implementada en la nube utilizando servicios modernos de infraestructura como servicio (PaaS) y bases de datos gestionadas de Microsoft Azure.

---

## 🚀 Tecnologías Utilizadas

* **Backend / Entorno de ejecución:** Node.js (v24 LTS)
* **Hosting / Despliegue:** Azure App Service (Linux, Plan F1 - Free)[cite: 4, 6]
* **Base de Datos:** Azure SQL Database (`AnimeGamerDB`)[cite: 5]
* **Control de Versiones y CI/CD:** Git, GitHub (`Juaness601/anime-gamer-vault`)

---

## 📂 Arquitectura en Azure

La solución se encuentra estructurada dentro del grupo de recursos `rg-anime-gamer`[cite: 5] bajo la siguiente distribución:

| Componente de Azure | Nombre del Recurso | Descripción |
| :--- | :--- | :--- |
| **App Service Plan** | `ASP-rganimegamer-a5aa` | Plan de alojamiento Linux en nivel gratuito (F1)[cite: 4, 5]. |
| **Aplicación Web** | `anime-gamer-vault-juanes` | Interfaz web principal desplegada y conectada a GitHub[cite: 5, 6]. |
| **Base de Datos SQL** | `AnimeGamerDB` | Almacenamiento relacional administrado en la nube[cite: 5]. |
| **Servidor SQL** | `sql-anime-juanes-2026` | Servidor lógico que hospeda la base de datos[cite: 5]. |
| **Identidad Administrada** | `oidc-msi-9537` | Control de acceso seguro entre servicios[cite: 5]. |

---

## 🛠️ Instalación y Ejecución Local

Si deseas clonar y probar el proyecto en tu entorno local, sigue estos pasos:

1. **Clona el repositorio:**
   ```bash
   git clone [https://github.com/Juaness601/anime-gamer-vault.git](https://github.com/Juaness601/anime-gamer-vault.git)
   cd anime-gamer-vault
