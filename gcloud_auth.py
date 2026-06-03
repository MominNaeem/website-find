"""Shared Google Cloud credential setup.

Writes the service account key from env/Streamlit secrets to a temp file
and sets GOOGLE_APPLICATION_CREDENTIALS. Import this before using any
google.genai client.
"""
import os
import tempfile

_initialized = False


def ensure_credentials():
    global _initialized
    if _initialized:
        return
    _initialized = True

    if os.environ.get("GOOGLE_APPLICATION_CREDENTIALS"):
        return  # Already set (e.g. local dev with gcloud)

    sa_key = os.environ.get("GOOGLE_SA_KEY", "")
    if not sa_key:
        try:
            import streamlit as st
            sa_key = st.secrets.get("GOOGLE_SA_KEY", "")
        except Exception:
            pass
    if sa_key:
        tmp = tempfile.NamedTemporaryFile(mode="w", suffix=".json", delete=False)
        tmp.write(sa_key)
        tmp.close()
        os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = tmp.name
