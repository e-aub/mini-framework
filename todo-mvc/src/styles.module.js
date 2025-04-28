export const styles = {
    container: {
        maxWidth: "500px",
        margin: "0 auto",
        padding: "20px",
        backgroundColor: "#f9f9f9",
        borderRadius: "8px",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
        fontFamily: "'Arial', sans-serif",
        transition: "all 0.3s ease",
        color: "#333"
    },
    header: {
        textAlign: "center",
        color: "#333",
        marginBottom: "20px",
        fontSize: "28px",
        transition: "color 0.3s ease"
    },
    inputContainer: {
        display: "flex",
        marginBottom: "20px",
        transition: "all 0.3s ease"
    },
    input: {
        flex: 1,
        padding: "12px",
        border: "1px solid #ddd",
        borderRadius: "4px 0 0 4px",
        fontSize: "16px",
        outline: "none",
        transition: "all 0.3s ease",
        backgroundColor: "#fff",
        color: "#333"
    },
    inputError: {
        border: "2px solid #ff4444",
        backgroundColor: "#fff8f8",
        color: "#333"
    },
    errorMessage: {
        color: "#ff4444",
        fontSize: "14px",
        marginTop: "5px",
        marginBottom: "10px",
        transition: "all 0.3s ease"
    },
    addButton: {
        backgroundColor: "#4a90e2",
        color: "white",
        border: "none",
        borderRadius: "0 4px 4px 0",
        padding: "12px 16px",
        cursor: "pointer",
        fontSize: "18px",
        fontWeight: "bold",
        transition: "all 0.3s ease"
    },
    addButtonHover: {
        backgroundColor: "#357abd"
    },
    toggleAllButton: {
        backgroundColor: "#f1f1f1",
        border: "1px solid #ddd",
        borderRadius: "4px",
        padding: "8px 12px",
        marginBottom: "15px",
        cursor: "pointer",
        fontSize: "14px",
        color: "#555",
        width: "100%",
        transition: "all 0.3s ease"
    },
    todoList: {
        listStyle: "none",
        padding: 0,
        margin: 0,
        transition: "all 0.3s ease",
        backgroundColor: "#f9f9f9",
        color: "#333"
    },
    todoItem: {
        display: "flex",
        alignItems: "center",
        padding: "12px",
        borderBottom: "1px solid #eee",
        transition: "all 0.3s ease",
        backgroundColor: "#fff",
        color: "#333"
    },
    checkButton: {
        width: "24px",
        height: "24px",
        marginRight: "10px",
        border: "1px solid #ddd",
        borderRadius: "50%",
        cursor: "pointer",
        transition: "all 0.3s ease"
    },
    todoText: {
        flex: 1,
        fontSize: "16px",
        color: "#333",
        transition: "all 0.3s ease"
    },
    completed: {
        textDecoration: "line-through",
        color: "#888"
    },
    darkMode: {
        container: {
            backgroundColor: "#1a1a1a",
            color: "#fff",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)"
        },
        header: {
            color: "#fff"
        },
        input: {
            backgroundColor: "#2c2c2c",
            color: "#fff",
            borderColor: "#444",
            transition: "all 0.3s ease"
        },
        inputError: {
            border: "2px solid #ff6666",
            backgroundColor: "#3a2a2a",
            color: "#fff"
        },
        errorMessage: {
            color: "#ff6666"
        },
        addButton: {
            backgroundColor: "#4a90e2",
            color: "#fff"
        },
        toggleAllButton: {
            backgroundColor: "#2c2c2c",
            color: "#fff",
            borderColor: "#444"
        },
        todoList: {
            backgroundColor: "#1a1a1a",
            color: "#fff"
        },
        todoItem: {
            backgroundColor: "#2c2c2c",
            color: "#fff",
            borderBottomColor: "#444"
        },
        todoText: {
            color: "#fff"
        },
        completed: {
            color: "#888"
        },
        checkButton: {
            borderColor: "#666"
        }
    },
    themeSwitch: {
        position: "fixed",
        top: "20px",
        right: "20px",
        padding: "12px 24px",
        fontSize: "16px",
        border: "none",
        borderRadius: "30px",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        gap: "8px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
        transition: "all 0.3s ease",
        fontWeight: "500",
        zIndex: 1000
    },
    themeSwitchLight: {
        backgroundColor: "#ffffff",
        color: "#333333",
        border: "1px solid #e0e0e0"
    },
    themeSwitchDark: {
        backgroundColor: "#2c2c2c",
        color: "#ffffff",
        border: "1px solid #404040"
    },
    toggleAllButtonLight: {
        backgroundColor: "#f0f0f0",
        color: "#333",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
    },
    toggleAllButtonDark: {
        backgroundColor: "#2c2c2c",
        color: "#fff",
        boxShadow: "0 2px 4px rgba(0,0,0,0.2)"
    }
};


